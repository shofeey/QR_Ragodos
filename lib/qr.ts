export type QRPayload = {
  event: string;
  title?: string;
  start?: string;
  end?: string;
};

export function buildQRPayload(payload: QRPayload): string {
  return JSON.stringify({
    v: 1,
    event: payload.event,
    title: payload.title,
    start: payload.start,
    end: payload.end,
  });
}

export function parseQRPayload(rawPayload: string) {
  try {
    const data = JSON.parse(rawPayload);

    if (!data.event) {
      return {
        ok: false as const,
        message: 'Invalid QR code: missing event.',
      };
    }

    return {
      ok: true as const,
      payload: {
        event: data.event,
        title: data.title,
        start: data.start,
        end: data.end,
      },
    };
  } catch {
    return {
      ok: false as const,
      message: 'Invalid QR code.',
    };
  }
}

