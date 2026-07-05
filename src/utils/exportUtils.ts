import type { ColumnConfig, SheetRow } from '../types';

function triggerDownload(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function escapeCsvValue(value: unknown): string {
  const str = String(value ?? '');
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function exportToCSV(columns: ColumnConfig[], rows: SheetRow[], filename = 'securesheet-export.csv') {
  const header = columns.map((c) => escapeCsvValue(c.headerName)).join(',');
  const body = rows
    .map((row) => columns.map((c) => escapeCsvValue(row[c.field])).join(','))
    .join('\n');
  triggerDownload(`${header}\n${body}`, filename, 'text/csv;charset=utf-8;');
}

// Generates an Excel-compatible SpreadsheetML (.xls) file without any external library.
export function exportToExcel(columns: ColumnConfig[], rows: SheetRow[], filename = 'securesheet-export.xls') {
  const headerCells = columns
    .map((c) => `<Cell><Data ss:Type="String">${c.headerName}</Data></Cell>`)
    .join('');
  const bodyRows = rows
    .map((row) => {
      const cells = columns
        .map((c) => {
          const value = row[c.field];
          const type = typeof value === 'number' ? 'Number' : 'String';
          const safe = String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
          return `<Cell><Data ss:Type="${type}">${safe}</Data></Cell>`;
        })
        .join('');
      return `<Row>${cells}</Row>`;
    })
    .join('');
  const xml = `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
  <Worksheet ss:Name="SecureSheet Export">
    <Table>
      <Row>${headerCells}</Row>
      ${bodyRows}
    </Table>
  </Worksheet>
</Workbook>`;
  triggerDownload(xml, filename, 'application/vnd.ms-excel');
}

// Mock PDF export — produces a readable text-based document since real PDF generation
// requires a backend/rendering engine outside this frontend-only app's scope.
export function exportToPDFMock(columns: ColumnConfig[], rows: SheetRow[], filename = 'securesheet-export.pdf.txt') {
  const header = columns.map((c) => c.headerName).join(' | ');
  const divider = '-'.repeat(header.length);
  const body = rows
    .map((row) => columns.map((c) => String(row[c.field] ?? '')).join(' | '))
    .join('\n');
  const content = `SecureSheet — Exported Report\nGenerated: ${new Date().toLocaleString()}\n\n${header}\n${divider}\n${body}`;
  triggerDownload(content, filename, 'text/plain;charset=utf-8;');
}
