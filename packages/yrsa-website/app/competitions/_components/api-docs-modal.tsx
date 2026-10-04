'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from './ui/dialog';

interface ApiDocsModalProps {
  trigger: React.ReactNode;
}

export function ApiDocsModal({ trigger }: ApiDocsModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-hidden border-none bg-transparent p-0 shadow-none">
        {/* Windows 95 Window */}
        <div className="flex flex-col border-2 border-t-white border-r-[#808080] border-b-[#808080] border-l-white bg-[#c0c0c0] [box-shadow:inset_-1px_-1px_0_0_#000000,inset_1px_1px_0_0_#dfdfdf]">
          {/* Title bar */}
          <DialogHeader className="flex flex-row items-center justify-between gap-2 bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 py-1">
            <DialogTitle className="flex items-center gap-2 text-sm font-bold text-white">
              <span>📡</span> API Documentation
            </DialogTitle>
            <DialogClose className="flex h-4 w-4 items-center justify-center border-2 border-t-white border-r-[#808080] border-b-[#808080] border-l-white bg-[#c0c0c0] text-xs leading-none font-bold hover:bg-[#d4d4d4] active:border-t-[#808080] active:border-r-white active:border-b-white active:border-l-[#808080]">
              ✕
            </DialogClose>
          </DialogHeader>

          {/* Content area */}
          <div className="m-1 max-h-[70vh] overflow-y-auto border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-white p-3">
            <div className="space-y-4 text-xs">
              {/* Base URL */}
              <section>
                <h3 className="mb-1 font-bold text-[#000080]">Base URL</h3>
                <div className="border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-[#c0c0c0] p-2">
                  <code className="font-mono">/api/competitions/monthly/results</code>
                </div>
              </section>

              {/* Endpoints */}
              <section>
                <h3 className="mb-2 font-bold text-[#000080]">Endpoints</h3>

                {/* GET /results */}
                <div className="mb-3 border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-[#ffffcc] p-2">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="border border-[#808080] bg-[#008000] px-1 text-[10px] font-bold text-white">
                      GET
                    </span>
                    <code className="font-mono text-[11px]">/api/competitions/monthly/results</code>
                  </div>
                  <p className="mb-2 text-gray-700">結果一覧を取得（フィルタ可能）</p>

                  <div className="mb-2">
                    <h4 className="mb-1 font-bold">Query Parameters</h4>
                    <div className="border border-[#808080] bg-white">
                      <table className="w-full text-[11px]">
                        <thead>
                          <tr className="bg-[#c0c0c0]">
                            <th className="border-r border-b border-[#808080] p-1 text-left">パラメータ</th>
                            <th className="border-r border-b border-[#808080] p-1 text-left">型</th>
                            <th className="border-b border-[#808080] p-1 text-left">説明</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border-r border-b border-[#808080] p-1">
                              <code>year</code>
                            </td>
                            <td className="border-r border-b border-[#808080] p-1">number</td>
                            <td className="border-b border-[#808080] p-1">年度（例: 2024）</td>
                          </tr>
                          <tr>
                            <td className="border-r border-b border-[#808080] p-1">
                              <code>date</code>
                            </td>
                            <td className="border-r border-b border-[#808080] p-1">string</td>
                            <td className="border-b border-[#808080] p-1">日付（YYYY-MM-DD）</td>
                          </tr>
                          <tr>
                            <td className="border-r border-b border-[#808080] p-1">
                              <code>event</code>
                            </td>
                            <td className="border-r border-b border-[#808080] p-1">string</td>
                            <td className="border-b border-[#808080] p-1">
                              種目（AR60S, AP60, HR40, BR60S, BR40FR, BP60）
                            </td>
                          </tr>
                          <tr>
                            <td className="border-r border-[#808080] p-1">
                              <code>name</code>
                            </td>
                            <td className="border-r border-[#808080] p-1">string</td>
                            <td className="p-1">選手名（部分一致）</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-1 font-bold">Example</h4>
                    <div className="border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-[#c0c0c0] p-1">
                      <code className="font-mono text-[10px]">
                        GET /api/competitions/monthly/results?year=2024&event=AR60S
                      </code>
                    </div>
                  </div>
                </div>

                {/* GET /results/years */}
                <div className="border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-[#ffffcc] p-2">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="border border-[#808080] bg-[#008000] px-1 text-[10px] font-bold text-white">
                      GET
                    </span>
                    <code className="font-mono text-[11px]">/api/competitions/monthly/results/years</code>
                  </div>
                  <p className="mb-2 text-gray-700">利用可能な年度一覧を取得</p>

                  <div>
                    <h4 className="mb-1 font-bold">Response Example</h4>
                    <pre className="overflow-x-auto border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-[#c0c0c0] p-2 font-mono text-[10px]">
                      {`{
  "data": [
    {
      "year": 2025,
      "count": 8,
      "eventCount": 85,
      "dateRange": {
        "start": "2025-04-26",
        "end": "2025-11-22"
      }
    }
  ],
  "meta": { "total": 2 }
}`}
                    </pre>
                  </div>
                </div>
              </section>

              {/* Response Format */}
              <section>
                <h3 className="mb-1 font-bold text-[#000080]">Response Format</h3>
                <pre className="overflow-x-auto border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-[#c0c0c0] p-2 font-mono text-[10px]">
                  {`{
  "data": [
    {
      "date": "2024-11-23",
      "event": "AR60S",
      "rank": 1,
      "name": "選手名",
      "series": [101.8, 99.7, 99.8, 102.3, 100.6, 102.3],
      "total": 606.5,
      "remarks": ""
    }
  ],
  "meta": {
    "total": 100,
    "dates": 12,
    "events": ["AR60S", "AP60", ...],
    "fiscalYears": [2025, 2024],
    "filters": { ... }
  }
}`}
                </pre>
              </section>

              {/* Error Handling */}
              <section>
                <h3 className="mb-1 font-bold text-[#000080]">Error Responses</h3>
                <div className="border border-[#808080] bg-white">
                  <table className="w-full text-[11px]">
                    <thead>
                      <tr className="bg-[#c0c0c0]">
                        <th className="border-r border-b border-[#808080] p-1 text-left">Status</th>
                        <th className="border-b border-[#808080] p-1 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border-r border-b border-[#808080] p-1">
                          <code>400</code>
                        </td>
                        <td className="border-b border-[#808080] p-1">Invalid parameter</td>
                      </tr>
                      <tr>
                        <td className="border-r border-[#808080] p-1">
                          <code>500</code>
                        </td>
                        <td className="p-1">Internal server error</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>

          {/* Status bar */}
          <div className="flex border-t border-[#808080] bg-[#c0c0c0] px-1 py-0.5">
            <div className="flex-1 border border-t-[#808080] border-r-white border-b-white border-l-[#808080] px-1 text-[10px]">
              REST API for competition results
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
