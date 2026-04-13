import puppeteer from 'puppeteer';
import {
	createHash,
} from 'node:crypto';
import {
	readFileSync,
	writeFileSync,
	mkdirSync,
	existsSync,
} from 'node:fs';
import {
	fileURLToPath,
} from 'node:url';
import {
	dirname,
	join,
} from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

/** Bump when HTML/CSS layout in this script changes (forces PDF regen). */
const TEMPLATE_VERSION = 2;

const RESUME_JSON = join(ROOT, 'src', 'data', 'resume-data.json');
const PDF_OUT = join(ROOT, 'public', 'GibinGeorgeFullstack.pdf');
const CACHE_DIR = join(ROOT, '.cache');
const HASH_FILE = join(CACHE_DIR, 'resume-pdf.sha256');

const RESUME_STYLES = `
@page { margin-top: 16px; }
body {
	background: #fff;
	color: #222;
	margin: 0;
	padding: 0;
	font-size: 16px;
	-webkit-user-select: text;
	-moz-user-select: text;
	-ms-user-select: text;
	user-select: text;
}
.container {
	max-width: 740px;
	margin: 0 auto;
	background: #fff;
	padding: 14px 14px;
}
h1 {
	font-size: 1.35em;
	margin: 0 0 .15em 0;
	color: #111;
	font-weight: 700;
	letter-spacing: .5px;
}
.contact {
	margin-bottom: .8em;
	color: #222;
	font-size: 1em;
}
.contact a {
	color: #222;
	text-decoration: none;
}
hr {
	border: none;
	border-top: 1px solid #bbb;
	margin: .8em 0;
}
h2 {
	color: #111;
	margin-top: .8em;
	margin-bottom: .2em;
	font-size: 1.08em;
	font-weight: 700;
	letter-spacing: .5px;
	border-bottom: 1px solid #bbb;
	padding-bottom: .08em;
}
h3 {
	margin: .5em 0 .05em 0;
	font-size: 1em;
	color: #111;
	font-weight: 700;
}
h3::after {
	content: "";
	display: table;
	clear: both;
}
.role { font-weight: 700; }
.org-loc {
	color: #222;
	font-size: .97em;
	margin-bottom: .05em;
}
.period {
	float: right;
	color: #444;
	font-size: .97em;
	font-style: italic;
	font-weight: 400;
}
ul {
	margin-top: .05em;
	margin-bottom: .4em;
	padding-left: 1em;
}
li {
	margin-bottom: .15em;
	line-height: 1.22;
	font-size: .98em;
}
.skills-list {
	margin-bottom: .5em;
	font-size: .98em;
	list-style: disc inside;
	columns: 1;
}
.skills-list li { margin-bottom: .08em; }
a {
	color: inherit;
	text-decoration: none;
}
@media (max-width:600px) {
	.container { padding: 6px 2px; }
	.skills-list { columns: 1; }
}
@media print {
	.container {
		box-shadow: none !important;
		border-radius: 0 !important;
		background: 0 0 !important;
		padding: 4px 4px !important;
	}
	.education {
		break-inside: avoid;
		page-break-inside: avoid;
	}
	/* Keep section titles with the block that follows (avoids "Experience" alone at page bottom). */
	h2 {
		page-break-after: avoid;
		break-after: avoid;
		page-break-before: auto;
	}
	h3 {
		page-break-before: auto;
		page-break-after: auto;
	}
	/* Allow long jobs to split across pages; avoid+atomic exp-blocks orphaned the Experience heading. */
	.exp-block {
		break-inside: auto;
		page-break-inside: auto;
	}
	p, ul { page-break-inside: auto; }
}
`;

function escapeHtml(s) {
	if (s == null) return '';
	return String(s)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

function renderResumeHtml(data) {
	const p = data.personalInfo;
	const contactParts = [
		escapeHtml(p.location),
		`<a href="mailto:${escapeHtml(p.email)}">${escapeHtml(p.email)}</a>`,
		`<a href="tel:${escapeHtml(p.phone)}">${escapeHtml(p.phone)}</a>`,
	].join(' | ');

	const skillsLis = (data.skills || [])
		.map(
			(cat) =>
				`<li><strong>${escapeHtml(cat.category)}:</strong> ${escapeHtml((cat.items || []).join(', '))}</li>`,
		)
		.join('\n');

	const expBlocks = (data.experience || [])
		.map((job) => {
			const lis = (job.highlights || [])
				.map((h) => `<li>${escapeHtml(h)}</li>`)
				.join('\n');
			return `<div class="exp-block">
<h3><span class="role">${escapeHtml(job.role)}</span> <span class="period">${escapeHtml(job.period)}</span></h3>
<div class="org-loc">${escapeHtml(job.company)}, ${escapeHtml(job.location)}</div>
<ul>
${lis}
</ul>
</div>`;
		})
		.join('\n');

	const eduLis = (data.education || [])
		.map(
			(ed) =>
				`<li><strong>${escapeHtml(ed.degree)}</strong><br>${escapeHtml(ed.institution)}, ${escapeHtml(ed.location)} – ${escapeHtml(ed.year)}</li>`,
		)
		.join('\n');

	const title = `${p.name} - Resume`;

	return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${escapeHtml(title)}</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>${RESUME_STYLES}</style>
</head>
<body>
<div class="container">
<h1>${escapeHtml(p.name)}</h1>
<div class="contact">${contactParts}</div>
<hr>
<h2>Summary</h2>
<p>${escapeHtml(data.summary)}</p>
<h2>Skills</h2>
<ul class="skills-list">
${skillsLis}
</ul>
<section class="experience">
<h2>Experience</h2>
${expBlocks}
</section>
<div class="education">
<h2>Education</h2>
<ul>
${eduLis}
</ul>
</div>
</div>
</body>
</html>`;
}

function computeInputHash(jsonRaw) {
	return createHash('sha256')
		.update(jsonRaw)
		.update('\n')
		.update(String(TEMPLATE_VERSION))
		.digest('hex');
}

function shouldSkip(currentHash) {
	if (!existsSync(PDF_OUT)) return false;
	if (!existsSync(HASH_FILE)) return false;
	const prev = readFileSync(HASH_FILE, 'utf8').trim();
	return prev === currentHash;
}

async function main() {
	const jsonRaw = readFileSync(RESUME_JSON);
	const hash = computeInputHash(jsonRaw);

	if (shouldSkip(hash)) {
		console.log('Resume PDF up to date; skipping Puppeteer.');
		return;
	}

	let data;
	try {
		data = JSON.parse(jsonRaw.toString('utf8'));
	} catch (e) {
		console.error('Invalid resume-data.json:', e);
		process.exit(1);
	}

	const html = renderResumeHtml(data);
	mkdirSync(join(ROOT, 'public'), { recursive: true });

	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	});
	try {
		const page = await browser.newPage();
		await page.setContent(html, { waitUntil: 'networkidle0' });
		await page.pdf({
			path: PDF_OUT,
			format: 'A4',
			printBackground: true,
		});
	} finally {
		await browser.close();
	}

	mkdirSync(CACHE_DIR, { recursive: true });
	writeFileSync(HASH_FILE, hash + '\n', 'utf8');
	console.log(`Resume PDF generated: ${PDF_OUT}`);
}

main().catch((err) => {
	console.error('generate-resume-pdf failed:', err);
	process.exit(1);
});
