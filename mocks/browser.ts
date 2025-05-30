import { setupWorker, rest } from "msw"

export const worker = setupWorker(
  rest.post("/api/orders", (req, res, ctx) => {
    return res(ctx.delay(500), ctx.status(200), ctx.json({ success: true }))
  }),

  rest.post("/api/inquiries", (req, res, ctx) => {
    return res(ctx.delay(500), ctx.status(200), ctx.json({ success: true }))
  }),
)
