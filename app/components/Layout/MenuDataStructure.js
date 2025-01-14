import MenuItemType from "./MenuItemType";
import {showAssetsAccounts} from "../../branding";

class MenuDataStructure {
    /*
        clickHandlers: {
            toggleLock,
            followUnfollow,
            showSend,
            showDeposit,
            showWithdraw
        },
        renderingProps: {
            isAccountLocked,
            passwordLogin,
            isContact,
            isMyAccount,
            showAccountLinks,
            tradeUrl,
            enableDepositWithdraw,

            passwordLogin,

            currentAccount,
            createAccountLink
        }
    */
    static getData(clickHandlers, renderingProps) {
        const _get = function(itemCaller) {
            let state = renderingProps;
            state.clickHandlers = clickHandlers;
            let item = itemCaller(state);
            if (!item.inHeaderBehavior) {
                item.inHeaderBehavior = MenuItemType.Never;
            }
            if (!item.inDropdownBehavior) {
                item.inDropdownBehavior = MenuItemType.Never;
            }
            if (item.inHeaderBehavior === MenuItemType.WhenAccount) {
                item.hidden = !state.currentAccount;
                item.inHeaderBehavior = MenuItemType.Always;
            }
            if (item.inDropdownBehavior === MenuItemType.WhenAccount) {
                if (!item.hasOwnProperty("hidden")) {
                    item.hidden = !state.currentAccount;
                }
                item.inDropdownBehavior = MenuItemType.Always;
            }
            if (item.inDropdownBehavior === MenuItemType.WhenUnlocked) {
                item.hidden = !state.lo;
                item.inDropdownBehavior = MenuItemType.Always;
            }
            if (item.inDropdownBehavior === MenuItemType.WhenNotMyAccount) {
                item.hidden = state.isMyAccount || !state.currentAccount;
                item.inDropdownBehavior = MenuItemType.Always;
            }
            if (item.inDropdownBehavior === MenuItemType.WhenNotInHeader) {
                item.inDropdownBehavior = MenuItemType.Always;
            }

            return item;
        };

        let result = MenuDataStructure.getDropdownMenu().map(item => {
            return _get(item);
        });

        return result;
    }

    static getHeader() {
        const allItems = MenuDataStructure.getAllEntries();

        return [allItems.dashboard, allItems.market, allItems.explorer];
    }

    static getDropdownMenu() {
        const allItems = MenuDataStructure.getAllEntries();

        let oldsettings_mobile = allItems.settings_mobile;
        allItems.settings_mobile = function(state) {
            let item = oldsettings_mobile(state);
            let submenu = [
                allItems.settings_general,
                allItems.settings_wallet,
                allItems.settings_accounts,
                allItems.settings_password,
                allItems.settings_backup,
                allItems.settings_restore,
                allItems.settings_access,
                allItems.settings_faucet_address,
                allItems.settings_reset
            ];
            item.submenu = submenu.map(item => item(state));
            return item;
        };

        let oldinsight = allItems.insight;
        allItems.insight = function(state) {
            let item = oldinsight(state);
            let submenu = [
                allItems.account_voting,
                allItems.account_assets,
                allItems.account_pools,
                allItems.account_signedmessages,
                allItems.account_stats,
                allItems.account_whitelist,
                allItems.account_permissions
            ];
            item.submenu = submenu.map(item => item(state));
            return item;
        };

        return [
            allItems.login,
            allItems.create_account,
            allItems.dashboard,
            allItems.market,
            allItems.explorer,
            allItems.divider,
            allItems.transfer,
            allItems.deposit,
            allItems.poolmart,
            allItems.withdraw,
            //allItems.token_distribution,
            allItems.settings,
            allItems.settings_mobile,
            allItems.help,
            allItems.account_voting,
            allItems.account_vesting,
            allItems.account_permissions,
            allItems.account_assets,
            allItems.account_stats,
            allItems.insight,
            //allItems.accounts,
            allItems.terms_conditions_page_1,
            allItems.terms_conditions_page_2,
            allItems.privacy_policy
            // allItems.accounts
            // allItems.account_voting,
            // allItems.account_signedmessages,
            // allItems.account_stats,
            // allItems.account_vesting,
            // allItems.account_vesting_2,
            // allItems.account_whitelist,
            // allItems.divider,
            // allItems.news,
            // allItems.borrow,
            // allItems.barter,
            // allItems.direct_debit,
            // allItems.prediction,
            // allItems.htlc
        ];
    }

    static getAllEntries() {
        return {
            login: state => ({
                target: state.clickHandlers.toggleLock,
                icon: "power",
                text: state.locked
                    ? "header.lock_short"
                    : "header.unlock_short",
                inDropdownBehavior: MenuItemType.Always
            }),
            divider: state => ({
                inDropdownBehavior: MenuItemType.Divider
            }),
            account: state => ({
                includePattern: ["/"],
                excludePattern: [
                    "/assets",
                    "/voting",
                    "/signedmessages",
                    "/member-stats",
                    "/vesting",
                    "/whitelist",
                    "/permissions"
                ],
                target: `/account/${state.currentAccount}`,
                icon: "user",
                text: "header.account",
                inHeaderBehavior: MenuItemType.WhenAccount,
                inDropdownBehavior: MenuItemType.Never
            }),
            create_account: state => ({
                includePattern: state.passwordLogin
                    ? "/create-account/password"
                    : "/create-account/wallet",
                target: state.passwordLogin
                    ? "/create-account/password"
                    : "/create-account/wallet",
                icon: {
                    name: "create_account",
                    title: "icons.user.create_account"
                },
                text: "header.create_account",
                hidden: !!state.passwordLogin,
                inDropdownBehavior: MenuItemType.Always
            }),
            dashboard: state => ({
                includePattern: ["/account", "account/", "/account/"],
                excludePattern: [
                    "/assets",
                    "/voting",
                    "/signedmessages",
                    "/member-stats",
                    "/vesting",
                    "/whitelist",
                    "/permissions"
                ],
                target: `/account/${state.currentAccount}`,
                icon: "dashboard",
                text: "header.dashboard",
                inHeaderBehavior: MenuItemType.WhenAccount,
                inDropdownBehavior: MenuItemType.Never
            }),
            market: state => ({
                includePattern: "/market/",
                target: state.tradeUrl,
                icon: {
                    name: "trade",
                    title: "icons.trade.exchange"
                },
                text: "header.exchange",
                inHeaderBehavior: MenuItemType.Never,
                inDropdownBehavior: MenuItemType.Never
            }),
          poolmart: state => ({
                includePattern: "/pools",
                //target: state.poolmartUrl,
                target: "/pools",
                icon: {name: "poolmart", title: "icons.poolmart.title"},
                text: "header.poolmart",
                inHeaderBehavior: MenuItemType.Always,
                inDropdownBehavior: MenuItemType.WhenAccount
            }),
            explorer: state => ({
                includePattern: "/explorer",
                target: "/explorer/blocks",
                icon: {
                    name: "server",
                    size: "2x"
                },
                text: "header.explorer",
                inHeaderBehavior: MenuItemType.Never,
                inDropdownBehavior: MenuItemType.Never
            }),
            transfer: state => ({
                target: state.clickHandlers.showSend,
                icon: "transfer",
                text: "header.payments",
                inDropdownBehavior: MenuItemType.WhenAccount,
                inHeaderBehavior: MenuItemType.Always,
            }),
            deposit: () => ({
                target: "/deposit/new",
                icon: {
                    name: "deposit",
                    title: "icons.deposit.deposit"
                },
                submenu: {
                    target: "/deposit",
                    text: "deposit.sub_title"
                },
                text: "deposit.title",
                inDropdownBehavior: MenuItemType.Never,
                inHeaderBehavior: MenuItemType.Always,
            }),
            withdraw: () => ({
                target: "/withdraw/new",
                icon: "withdraw",
                text: "withdraw.title",
                inDropdownBehavior: MenuItemType.Never,
                inHeaderBehavior: MenuItemType.Always,
            }),
            account_pools: state => ({
                includePattern: "/pools",
                excludePattern: "explorer",
                target: `/account/${state.currentAccount}/pools`,
                icon: "pools",
                text: "account.liquidity_pools.title",
                inHeaderBehavior: MenuItemType.Dynamic,
                inDropdownBehavior: MenuItemType.WhenAccount
            }),
            deposit_withdraw: state => ({
                includePattern: "deposit-withdraw",
                icon: {
                    name: "deposit-withdraw",
                    title: "icons.deposit.deposit_withdraw"
                },
                text: "header.deposit-withdraw",
                inHeaderBehavior: MenuItemType.Dynamic,
                inDropdownBehavior: MenuItemType.Never
            }),
            token_distribution: state => ({
                target: "/token-distribution/new",
                icon: "barter",
                text: "token_distribution.title",
                inDropdownBehavior: MenuItemType.WhenAccount
            }),
            settings: state => ({
                includePattern: "/settings",
                target: "/settings",
                additionalClassName: "desktop-only",
                icon: "cogs",
                text: "header.settings",
                inHeaderBehavior: MenuItemType.Dynamic,
                inDropdownBehavior: MenuItemType.Always
            }),
            spotlight: state => ({
                includePattern: "/spotlight",
                target: "/spotlight",
                icon: "showcases",
                text: "header.showcases",
                inHeaderBehavior: MenuItemType.Dynamic,
                inDropdownBehavior: MenuItemType.Always
            }),
            settings_mobile: state => ({
                includePattern: "/settings",
                additionalClassName: "mobile-only",
                icon: "cogs",
                text: "header.settings",
                inHeaderBehavior: MenuItemType.Never,
                inDropdownBehavior: MenuItemType.Always
            }),
            insight: state => ({
                includePattern: "/account",
                icon: "insight",
                text: "header.advanced",
                inHeaderBehavior: MenuItemType.Never,
                inDropdownBehavior: MenuItemType.WhenAccount
            }),
            settings_general: state => ({
                target: "/settings/general",
                text: "settings.general"
            }),
            settings_wallet: state => ({
                target: "/settings/wallet",
                hidden: state.passwordLogin
            }),
            settings_accounts: state => ({
                target: "/settings/accounts",
                text: "settings.accounts"
            }),
            settings_password: state => ({
                target: "/settings/password",
                text: "settings.password",
                hidden: state.passwordLogin
            }),
            settings_backup: state => ({
                target: "/settings/backup",
                text: "settings.backup",
                hidden: state.passwordLogin
            }),
            settings_restore: state => ({
                target: "/settings/restore",
                text: "settings.restore",
                hidden: state.passwordLogin
            }),
            settings_access: state => ({
                target: "/settings/access",
                text: "settings.access"
            }),
            settings_faucet_address: state => ({
                target: "/settings/faucet_address",
                text: "settings.faucet_address"
            }),
            settings_reset: state => ({
                target: "/settings/reset",
                text: "settings.reset"
            }),
            news: state => ({
                includePattern: "/news",
                target: "/news",
                icon: "news",
                text: "news.news",
                inHeaderBehavior: MenuItemType.Dynamic,
                inDropdownBehavior: MenuItemType.Always
            }),
            account_voting: state => ({
                includePattern: "/voting",
                target: `/account/${state.currentAccount}/voting`,
                icon: {
                    name: "thumbs-up",
                    title: "icons.thumbs_up"
                },
                text: "account.voting",
                inHeaderBehavior: MenuItemType.Dynamic,
                inDropdownBehavior: MenuItemType.WhenAccount
            }),
            account_assets: state => ({
                includePattern: "/assets",
                excludePattern: "explorer",
                target: `/account/${state.currentAccount}/assets`,
                icon: "assets",
                text: "explorer.assets.title",
                inHeaderBehavior: MenuItemType.Dynamic,
                inDropdownBehavior: MenuItemType.WhenAccount
            }),
            account_signedmessages: state => ({
                includePattern: "/signedmessages",
                target: `/account/${state.currentAccount}/signedmessages`,
                icon: {
                    name: "text",
                    title: "icons.text.signed_messages"
                },
                text: "icons.text.signed_messages",
                inHeaderBehavior: MenuItemType.Dynamic,
                inDropdownBehavior: MenuItemType.WhenAccount
            }),
            account_stats: state => ({
                includePattern: "/member-stats",
                target: `/account/${state.currentAccount}/member-stats`,
                icon: {
                    name: "text",
                    title: "icons.text.membership_stats"
                },
                text: "account.member.info",
                inHeaderBehavior: MenuItemType.Dynamic,
                inDropdownBehavior: MenuItemType.WhenAccount
            }),
            account_vesting: state => ({
                includePattern: "/vesting",
                target: `/account/${state.currentAccount}/vesting`,
                icon: "hourglass",
                text: "account.vesting.title",
                inHeaderBehavior: MenuItemType.Never,
                inDropdownBehavior: MenuItemType.WhenAccount
            }),
            account_vesting_2: state => ({
                includePattern: "/vesting",
                target: `/account/${state.currentAccount}/vesting`,
                icon: "hourglass",
                text: "account.vesting.title",
                inHeaderBehavior: MenuItemType.Dynamic,
                inDropdownBehavior: MenuItemType.Never
            }),
            account_whitelist: state => ({
                includePattern: "/whitelist",
                target: `/account/${state.currentAccount}/whitelist`,
                icon: "list",
                text: "account.whitelist.title",
                inHeaderBehavior: MenuItemType.Dynamic,
                inDropdownBehavior: MenuItemType.WhenAccount
            }),
            account_permissions: state => ({
                includePattern: "/permissions",
                target: `/account/${state.currentAccount}/permissions`,
                icon: "warning",
                text: "account.permissions",
                inHeaderBehavior: MenuItemType.Dynamic,
                inDropdownBehavior: MenuItemType.WhenAccount
            }),
            accounts: state => ({
                includePattern: "/accounts",
                target: "/accounts",
                icon: "folder",
                text: "explorer.accounts.title",
                inHeaderBehavior: MenuItemType.Never,
                inDropdownBehavior: MenuItemType.WhenAccount
            }),
            help: state => ({
                includePattern: "/help",
                target: "/help",
                icon: {
                    name: "question-circle",
                    title: "icons.question_circle"
                },
                text: "header.help",
                inHeaderBehavior: MenuItemType.Dynamic,
                inDropdownBehavior: MenuItemType.Always
            }),
            borrow: state => ({
                includePattern: "/borrow",
                icon: "borrow",
                text: "showcases.borrow.title",
                inHeaderBehavior: MenuItemType.Dynamic,
                inDropdownBehavior: MenuItemType.Never
            }),
            barter: state => ({
                includePattern: "/barter",
                icon: "barter",
                text: "showcases.barter.title",
                inHeaderBehavior: MenuItemType.Dynamic,
                inDropdownBehavior: MenuItemType.Never
            }),
            direct_debit: state => ({
                includePattern: "/direct-debit",
                icon: "direct_debit",
                text: "showcases.direct_debit.title",
                inHeaderBehavior: MenuItemType.Dynamic,
                inDropdownBehavior: MenuItemType.Never
            }),
            prediction: state => ({
                includePattern: "/prediction",
                icon: "prediction-large",
                text: "showcases.prediction_market.title",
                inHeaderBehavior: MenuItemType.Dynamic,
                inDropdownBehavior: MenuItemType.Never
            }),
            htlc: state => ({
                includePattern: "/htlc",
                icon: "htlc",
                text: "showcases.htlc.title_short",
                inHeaderBehavior: MenuItemType.Dynamic,
                inDropdownBehavior: MenuItemType.Never
            }),
            terms_conditions_page_1: state => ({
                target: () => {
                    window.open(
                        "https://homepesa.com/terms-conditions-page-1/terms-%2526-conditions-page-1.html"
                    );
                },
                icon: {
                    name: "text",
                    title: "icons.text"
                },
                text: "header.terms_conditions_page_1",
                inHeaderBehavior: MenuItemType.Dynamic,
                inDropdownBehavior: MenuItemType.Always
            }),
            terms_conditions_page_2: state => ({
                target: () => {
                    window.open(
                        "https://homepesa.com/terms-conditions-page-1/terms-%252526-conditions-page-2.html"
                    );
                },
                icon: {
                    name: "text",
                    title: "icons.text"
                },
                text: "header.terms_conditions_page_2",
                inHeaderBehavior: MenuItemType.Dynamic,
                inDropdownBehavior: MenuItemType.Always
            }),
            privacy_policy: state => ({
                target: () => {
                    window.open("https://homepesa.com/privacy-policy/privacy-notice.html");
                },
                icon: {
                    name: "text",
                    title: "icons.text"
                },
                text: "header.privacy_policy",
                inHeaderBehavior: MenuItemType.Dynamic,
                inDropdownBehavior: MenuItemType.Always
            })
        };
    }
}

export default MenuDataStructure;
