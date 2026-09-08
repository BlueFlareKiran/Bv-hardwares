import 'server-only';

function rowHtml(label: string, value: string) {
  return `
    <tr>
      <td style="padding:0 0 16px;vertical-align:top;width:190px">
        <div style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#667085">${label}</div>
      </td>
      <td style="padding:0 0 16px;vertical-align:top">
        <div style="font-size:15px;line-height:1.55;color:#172033;font-weight:600">${value}</div>
      </td>
    </tr>`;
}

function infoCardRows(rows: Array<{ label: string; value: string }>) {
  return rows.map((row) => rowHtml(row.label, row.value)).join('');
}

function sectionCard(title: string, bodyHtml: string) {
  return `
    <div style="margin-top:24px;border:1px solid #e6eaf2;border-radius:14px;background:#f8fafc;padding:20px">
      <div style="font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#1237a5;margin-bottom:10px">${title}</div>
      <div style="font-size:14px;line-height:1.7;color:#334155">${bodyHtml}</div>
    </div>`;
}

interface BrandedEmailInput {
  eyebrow: string;
  badge: string;
  accentColor: string;
  title: string;
  subtitle: string;
  rows: Array<{ label: string; value: string }>;
  detailTitle: string;
  detailHtml: string;
  footerNote: string;
  secondaryRows?: Array<{ label: string; value: string }>;
}

export function renderBrandedEmail(input: BrandedEmailInput) {
  const accent = input.accentColor;
  const isOrange = accent.toLowerCase() === '#f35b0a';
  const badgeBackground = isOrange ? '#fff2e8' : '#edf4ff';
  const badgeBorder = isOrange ? '#ffd7bf' : '#cfe0ff';
  const secondary = input.secondaryRows?.length
    ? sectionCard(
        'Additional information',
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">${infoCardRows(
          input.secondaryRows
        )}</table>`
      )
    : '';

  return `
  <div style="margin:0;padding:24px;background:#eef2f7;font-family:Arial,Helvetica,sans-serif;color:#172033">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#eef2f7">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:720px;border-collapse:collapse">
            <tr>
              <td style="padding:0 12px">
                <div style="overflow:hidden;border:1px solid #dde3ed;border-radius:18px;background:#ffffff;box-shadow:0 20px 44px -32px rgba(23,32,51,.28)">
                  <div style="padding:28px 28px 18px;background:#f7f9fc;border-bottom:1px solid #ebeff5">
                    <div style="display:inline-block;padding:7px 12px;border-radius:999px;background:${badgeBackground};border:1px solid ${badgeBorder};font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:${accent}">${input.badge}</div>
                    <div style="margin-top:14px;font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#1237a5">${input.eyebrow}</div>
                    <h1 style="margin:10px 0 0;font-size:32px;line-height:1.15;letter-spacing:-.03em;color:#172033">${input.title}</h1>
                    <p style="margin:12px 0 0;font-size:15px;line-height:1.7;color:#526071;max-width:560px">${input.subtitle}</p>
                  </div>

                  <div style="padding:26px 28px 30px">
                    <div style="border:1px solid #e6eaf2;border-radius:14px;background:#ffffff;padding:20px 20px 4px">
                      <div style="font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#667085;margin-bottom:14px">Summary</div>
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">${infoCardRows(
                        input.rows
                      )}</table>
                    </div>

                    ${secondary}

                    ${sectionCard(input.detailTitle, input.detailHtml)}

                    <div style="margin-top:24px;padding-top:18px;border-top:1px solid #ebeff5;font-size:12px;line-height:1.7;color:#667085">
                      ${input.footerNote}
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>`;
}
