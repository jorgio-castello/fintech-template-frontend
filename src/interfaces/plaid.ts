export interface PlaidBalances {
	available: number | null;
	current: number;
	currencyCode: string | null;
}

export interface PlaidAccounts {
	id: string;
	balances: PlaidBalances;
	previewAccountNumber: string | null;
	accountName: string;
	accountType: string;
}

export interface PlaidTransactions {
    transactionId: string,
    accountId: string,
    amount: number | null,
    currency: string | null,
    category: string[] | null,
    date: string,
    location: {
        city: string | null,
        region: string | null,
        country: string | null,
        postalCode: string | null,
    },
    merchant: string | null,
    merchantName: string | null,
    paymentMetaData: {
        method: string | null,
        processor: string | null,
    }
}