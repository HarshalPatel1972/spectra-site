import { NextResponse } from 'next/server'
import { writeFile, mkdtemp, rm } from 'fs/promises'
import { join } from 'path'
import { tmpdir } from 'os'
import { exec } from 'child_process'
import { promisify } from 'util'
import { readFile, access, chmod } from 'fs/promises'
import { constants } from 'fs'

const execAsync = promisify(exec)

async function getSpectraBinaryPath() {
  if (process.env.SPECTRA_BIN_PATH) return process.env.SPECTRA_BIN_PATH;
  
  // Use bundled binaries inside the Next.js app
  const binDir = join(process.cwd(), 'bin');
  
  if (process.platform === 'win32') {
    return join(binDir, 'spectra.exe');
  }

  // Linux / Vercel fallback
  const binPath = join(binDir, 'spectra-linux');
  try {
    await chmod(binPath, 0o755); // Ensure executable permissions
  } catch (e) {
    // Ignore chmod error if filesystem is read-only (e.g. on Vercel)
  }
  return binPath;
}

export async function POST(req: Request) {
  try {
    const { code, language, filename } = await req.json()
    
    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 })
    }

    // Determine extension
    let ext = '.txt'
    switch(language) {
      case 'go': ext = '.go'; break;
      case 'python': ext = '.py'; break;
      case 'java': ext = '.java'; break;
      case 'javascript': ext = '.js'; break;
    }

    const tempDir = await mkdtemp(join(tmpdir(), 'spectra-playground-'))
    const tempFile = join(tempDir, filename || `code${ext}`)
    
    await writeFile(tempFile, code)

    try {
      // Execute Spectra.
      const spectraBin = await getSpectraBinaryPath()
      await execAsync(`"${spectraBin}" scan "${tempDir}" --output json --quiet --out-dir "${tempDir}"`)
      
      const jsonContent = await readFile(join(tempDir, 'spectra-findings.json'), 'utf8')
      const result = JSON.parse(jsonContent)
      
      // Cleanup
      await rm(tempDir, { recursive: true, force: true })

      return NextResponse.json(result)
    } catch (execError: any) {
      // If spectra exits with code > 0 (e.g. findings found or error), read file if it was created
      try {
        const jsonContent = await readFile(join(tempDir, 'spectra-findings.json'), 'utf8')
        await rm(tempDir, { recursive: true, force: true })
        return NextResponse.json(JSON.parse(jsonContent))
      } catch (e) {
        // Cleanup on error
        await rm(tempDir, { recursive: true, force: true })
        const errorMsg = execError.stderr || execError.message || 'Failed to execute spectra engine'
        return NextResponse.json({ error: `Engine Error: ${errorMsg}` }, { status: 400 })
      }
    }

  } catch (error: any) {
    return NextResponse.json({ error: `Internal Server Error: ${error.message}` }, { status: 500 })
  }
}
