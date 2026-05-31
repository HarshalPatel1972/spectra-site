const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);
const { mkdtemp, writeFile, rm, readFile } = require('fs/promises');
const { join } = require('path');
const { tmpdir } = require('os');

async function run() {
  const code = `package main\nimport "crypto/md5"\nfunc main() { md5.New() }`;
  const tempDir = await mkdtemp(join(tmpdir(), 'spectra-playground-'));
  await writeFile(join(tempDir, 'test.go'), code);

  try {
    const spectraBin = 'C:\\\\Users\\\\Harshal Patel\\\\Desktop\\\\spectra\\\\spectra.exe';
    await execAsync(`"${spectraBin}" scan "${tempDir}" --output json --quiet --out-dir "${tempDir}"`);
    
    const jsonContent = await readFile(join(tempDir, 'spectra-findings.json'), 'utf8');
    const result = JSON.parse(jsonContent);
    console.log("SUCCESS", result);
  } catch (err) {
    console.log("ERROR CATCH");
    console.error(err.message);
  }
  await rm(tempDir, { recursive: true, force: true });
}

run();
