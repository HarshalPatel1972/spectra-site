import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const qrs = searchParams.get('qrs');
  
  if (qrs === null || isNaN(parseInt(qrs, 10))) {
    return NextResponse.json({ error: 'Missing or invalid QRS parameter' }, { status: 400 });
  }

  const score = parseInt(qrs, 10);
  let color = 'success'; // brightgreen
  if (score >= 80) color = 'critical'; // red
  else if (score >= 60) color = 'important'; // orange
  else if (score >= 40) color = 'yellow';

  // We redirect to shields.io to dynamically generate the badge SVG
  const shieldsUrl = \`https://img.shields.io/badge/Spectra_QRS-\${score}-\${color}?logo=shield&style=flat-square\`;
  
  return NextResponse.redirect(shieldsUrl, 302);
}
