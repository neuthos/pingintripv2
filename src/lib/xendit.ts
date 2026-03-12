const XENDIT_SECRET_KEY = process.env.XENDIT_SECRET_KEY!;
const XENDIT_BASE_URL = "https://api.xendit.co";

function getAuthHeader() {
  return "Basic " + Buffer.from(XENDIT_SECRET_KEY + ":").toString("base64");
}

export interface CreateInvoiceParams {
  externalId: string;
  amount: number;
  currency: string;
  payerEmail: string;
  description: string;
  successRedirectUrl: string;
  failureRedirectUrl: string;
  customerName: string;
}

export interface XenditInvoice {
  id: string;
  external_id: string;
  invoice_url: string;
  status: string;
  amount: number;
  currency: string;
}

export async function createXenditInvoice(
  params: CreateInvoiceParams,
): Promise<XenditInvoice> {
  const res = await fetch(`${XENDIT_BASE_URL}/v2/invoices`, {
    method: "POST",
    headers: {
      Authorization: getAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      external_id: params.externalId,
      amount: params.amount,
      currency: params.currency,
      payer_email: params.payerEmail,
      description: params.description,
      success_redirect_url: params.successRedirectUrl,
      failure_redirect_url: params.failureRedirectUrl,
      customer: {
        given_names: params.customerName,
        email: params.payerEmail,
      },
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    console.error("Xendit create invoice error:", res.status, errBody);
    throw new Error(`Xendit API error ${res.status}: ${errBody}`);
  }

  return res.json();
}

export function verifyWebhookToken(token: string): boolean {
  return token === process.env.XENDIT_WEBHOOK_TOKEN;
}
