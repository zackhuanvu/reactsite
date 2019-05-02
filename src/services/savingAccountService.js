const savings = [
    {
        _id: "SA01",
        title: "CIT Savings Builder",
        siteLink: "https://www.cit.com/cit-bank/tiered-savings-account-savings-builder-value/",
        requirements: "$100 Monthly Deposit / $25K Balance",
        bonus: 0,
        apy: "2.45%"
    },
    {
        _id: "SA02",
        title: "Marcus By Goldman Sachs",
        siteLink: "https://www.marcus.com/us/en",
        requirements: "$1 to Open",
        bonus: 0,
        apy: "2.25%"
    },
    {
        _id: "SA03",
        title: "Ally Online Savings Account",
        siteLink: "https://www.ally.com/bank/online-savings-account/",
        requirements: "None",
        bonus: 0,
        apy: "2.20%"
    },
    {
        _id: "SA04",
        title: "Discover Online Savings Account",
        siteLink: "https://www.discover.com/online-banking/savings-account/",
        requirements: "$25K Opening Balance to get Bonus",
        bonus: 200,
        apy: "2.10%"
    },
    {
        _id: "SA05",
        title: "American Express Personal Savings",
        siteLink: "https://www.americanexpress.com/personalsavings/home.html",
        requirements: "None",
        bonus: 0,
        apy: "2.10%"
    }

];

export function getSavings() {
    return savings;
}