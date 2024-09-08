import {Apis} from "bitsharesjs-ws";
/** This file centralized customization and branding efforts throughout the whole wallet and is meant to facilitate
 *  the process.
 *
 *  @author Stefan Schiessl <stefan.schiessl@blockchainprojectsbv.com>
 */

/**
 * Determine if we are running on testnet or mainnet
 * @private
 */
function _isTestnet() {
    const testnet =
        "7c44a55541a4b1ef36d971e038359bb5070759d037099411161a02a711be1d6a"; // just for the record
    const mainnet =
        "7c44a55541a4b1ef36d971e038359bb5070759d037099411161a02a711be1d6a";

    // treat every other chain as testnet
    return Apis.instance().chain_id !== mainnet;
}

/**
 * Wallet name that is used throughout the UI and also in translations
 * @returns {string}
 */
export function getWalletName() {
    return "AcloudBank";
}

/**
 * URL of this wallet
 * @returns {string}
 */
export function getWalletURL() {
    return "https://acloudbank.com";
}

/**
 * Returns faucet information
 *
 * @returns {{url: string, show: boolean}}
 */

export function getFaucet() {
    return {
        url: "https://reg.acloudbank.com",
        show: false,
        editable: false,
        referrer: "onboarding.rsquared.foundation"
    };
}

export function getTestFaucet() {
    // fixme should be solved by introducing _isTestnet into getFaucet and fixing the mess in the Settings when fetching faucet address
    return {
        url: "http://localhost:3000", // operated as a contribution by BitShares EU
        show: true,
        editable: false
    };
}


/**
 * Logo that is used throughout the UI
 * @returns {*}
 */
export function getLogo() {
    return require("assets/logo.png").default;
}

/**
 * Default set theme for the UI
 * @returns {string}
 */
export function getDefaultTheme() {
    // possible ["darkTheme", "lightTheme", "midnightTheme"]
    return "lightTheme";
}

/**
 * Default login method. Either "password" (for cloud login mode) or "wallet" (for local wallet mode)
 * @returns {string}
 */
export function getDefaultLogin() {
    // possible: one of "password", "wallet"
    return "password";
}

/**
 * Default units used by the UI
 *
 * @returns {[string,string,string,string,string,string]}
 */
export function getUnits() {
    if (_isTestnet()) {
        return ["CLOUD"];
    }
    return ["CLOUD", "USD", "CNY", "EUR", "KES"];
}

export function getDefaultMarket() {
    if (_isTestnet()) {
        return "USD_TEST";
    }
    return "TEST_USD";
}

/**
 * These are the highlighted bases in "My Markets" of the exchange
 *
 * @returns {[string]}
 */
export function getMyMarketsBases() {
    if (_isTestnet()) {
        return ["CLOUD"];
    }
    return ["CLOUD", "USD", "CNY", "EUR", "KES"];
}

/**
 * These are the default quotes that are shown after selecting a base
 *
 * @returns {[string]}
 */
export function getMyMarketsQuotes() {
    if (_isTestnet()) {
        return ["CLOUD"];
    }
    let tokens = {
        nativeTokens: [
            "BTC",
            "BTC1.0",
            "CLOUD",
            "CNY",
            "CNY1.0",
            "EUR",
            "EUR1.0",
            "GOLD",
            "GOLD1.0",
            "RUBLE",
            "RUB1.0",
            "SILVER",
            "SILVER1.0",
           // "CLOUD",
            "USD1.0"
        ],
        gdexTokens: [
            "GDEX.BTC",
            "GDEX.BTO",
            "GDEX.EOS",
            "GDEX.ETH",
            "GDEX.BKBT",
            "GDEX.GXC",
            "GDEX.SEER",
            "GDEX.FOTA",
            "GDEX.JRC",
            "GDEX.EOSDAC",
            "GDEX.MTS",
            "GDEX.GUSD",
            "GDEX.IQ",
            "GDEX.NULS",
            "GDEX.USDT"
        ],
        openledgerTokens: [],
        rudexTokens: [],
        piratecashTockens: [
            "PIRATE.PIRATE",
            "PIRATE.BTC",
            "PIRATE.LTC",
            "PIRATE.BCC",
            "PIRATE.DOGE",
            "PIRATE.COSA"
        ],
        xbtsxTokens: [
            "ACB.USD",
            "ACB.RUB",
            "ACB.EUR",
            "NFT.LAND"
            
        ],
        honestTokens: ["HONEST.BTC", "HONEST.USD"],
        ioxbankTokens: ["IOB.XRP"],
        otherTokens: ["CVCOIN", "HERO", "OCT", "HERTZ", "YOYOW"]
    };

    let allTokens = [];
    for (let type in tokens) {
        allTokens = allTokens.concat(tokens[type]);
    }
    return allTokens;
}

/**
 * The featured markets displayed on the landing page of the UI
 *
 * @returns {list of string tuples}
 */
export function getFeaturedMarkets(quotes = []) {
    if (_isTestnet()) {
        return [["CLOUD", "CLOUD"]];
    }
    return [
        ["ACB", "CNY"],
        ["ACB", "CLOUD"],
        ["ACB", "EUR"],
        ["CNY", "ACB"],
        ["CLOUD", "ACB"],
        ["EUR", "ACB"]
    ].filter(a => {
        if (!quotes.length) return true;
        return quotes.indexOf(a[0]) !== -1;
    });
}

/**
 * Recognized namespaces of assets
 *
 * @returns {[string,string,string,string,string,string,string]}
 */
export function getAssetNamespaces() {
    if (_isTestnet()) {
        return [];
    }
    return ["ACB."/*, "GDEX.", "HONEST.", "IOB.", "PIRATE."*/];
}

/**
 * These namespaces will be hidden to the user, this may include "bit" for BitAssets
 * @returns {[string,string]}
 */
export function getAssetHideNamespaces() {
    // e..g "LLC.", "bit"
    return [];
}

/**
 * Allowed gateways that the user will be able to choose from in Deposit Withdraw modal
 * @param gateway
 * @returns {boolean}
 */
export function allowedGateway(gateway) {
    const allowedGateways = [
       /* "TRADE",
        "OPEN", // keep to display the warning icon, permanently disabled in gateways.js
        "RUDEX", // keep to display the warning icon, permanently disabled in gateways.js
        "GDEX",
        "PIRATE",
        */
        "CLOUD"
        /*
        "IOB",
        "CITADEL", // keep to display the warning icon, permanently disabled in gateways.js
        "BRIDGE", // keep to display the warning icon, permanently disabled in gateways.js
        "SPARKDEX" // keep to display the warning icon, permanently disabled in gateways.js
        */
    ];
    if (!gateway) {
        // answers the question: are any allowed?
        return allowedGateways.length > 0;
    }
    return allowedGateways.indexOf(gateway) >= 0;
}

export function getSupportedLanguages() {
    // not yet supported
}

export function getAllowedLogins() {
    // possible: list containing any combination of ["password", "wallet"]
    return ["password", "wallet"];
}

 export function getImageName(symbol) {
    if (symbol.startsWith("ACB.")) return symbol;
    if (
        get_allTokens().nativeTokens.indexOf(symbol) !== -1 ||
        symbol == "CLOUD" ||
        symbol == "DEXBOT"
    )
        return symbol;

    return "unknown";

    //let imgName = symbol.split(".");
    //return imgName.length === 2 ? imgName[1] : imgName[0];
}

export function getConfigurationAsset() {
    let assetSymbol = null;
    if (_isTestnet()) {
        assetSymbol = "NOTIFICATIONS";
    } else {
        assetSymbol = "CLOUD";
    }
    // explanation will be parsed out of the asset description (via split)
    return {
        symbol: assetSymbol,
        explanation:
            "This asset is used for decentralized configuration of the Homepesa UI placed under Homepesa.org."
    };
}



export function getSteemNewsTag() {
    return "rsquared.fdn";
}

export function showAssetsAccounts() {
    return ["acloudbank"];
}
