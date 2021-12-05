// DO NOT EDIT MANUALLY : THIS FILE IS AUTO CREATED
/* eslint-disable @typescript-eslint/no-shadow */
//noinspection JSUnusedGlobalSymbols

/**A thin wrapper around u128 that is using strings for JSON encoding/decoding, such that the full u128 range can be used for clients that convert JSON numbers to floats, like JavaScript and jq.

# Examples

Use `from` to create instances of this and `u128` to get the value out:

``` # use cosmwasm_std::Uint128; let a = Uint128::from(123u128); assert_eq!(a.u128(), 123);

let b = Uint128::from(42u64); assert_eq!(b.u128(), 42);

let c = Uint128::from(70u32); assert_eq!(c.u128(), 70); ```*/
export type Uint128 = string;
export type uint8 = number;
/**A fixed-point decimal value with 18 fractional digits, i.e. Decimal(1_000_000_000_000_000_000) == 1.0

The greatest possible value that can be represented is 340282366920938463463.374607431768211455 (which is (2^128 - 1) / 10^18)*/
export type Decimal = string;
export type Uint256 = string;
export interface BAssetInfo {
    decimals: uint8;
    name: string;
    symbol: string;
}
/**Binary is a wrapper around Vec<u8> to add base64 de/serialization with serde. It also adds some helper methods to help encode inline.

This is only needed as serde-json-{core,wasm} has a horrible encoding for Vec<u8>*/
export type Binary = string;
/**Cw20ReceiveMsg should be de/serialized under `Receive()` variant in a ExecuteMsg*/
export interface Cw20ReceiveMsg {
    amount: Uint128;
    msg: Binary;
    sender: string;
}
export type uint32 = number;
/**A fixed-point decimal value with 18 fractional digits, i.e. Decimal256(1_000_000_000_000_000_000) == 1.0 The greatest possible value that can be represented is 115792089237316195423570985008687907853269984665640564039457.584007913129639935 (which is (2^128 - 1) / 10^18)*/
export type Decimal256 = string;
export type uint64 = number;
export interface PollExecuteMsg {
    contract: string;
    msg: Binary;
    order: uint64;
}
export type VoteOption = "yes" | "no";
export type PollStatus = "in_progress" | "passed" | "rejected" | "executed" | "expired" | "failed";
export type OrderBy = "asc" | "desc";
export interface VoterInfo {
    balance: Uint128;
    vote: VoteOption;
}
export interface PricesResponseElem {
    asset: string;
    last_updated_time: uint64;
    price: Decimal256;
}
export interface WhitelistResponseElem {
    collateral_token: string;
    custody_contract: string;
    max_ltv: Decimal256;
    name: string;
    symbol: string;
}
/**CONTRACT: end_time > start_time*/
export interface VestingAccount {
    address: string;
    schedules: [
        uint64,
        uint64,
        Uint128
    ];
}
export interface VestingInfo {
    last_claim_time: uint64;
    schedules: [
        uint64,
        uint64,
        Uint128
    ];
}
export namespace airdrop {
    export interface ConfigResponse {
        anchor_token: string;
        owner: string;
    }
    export namespace ExecuteMsg {
        export interface UpdateConfig {
            update_config: {
                owner?: string | null;
            };
        }
        export interface RegisterMerkleRoot {
            register_merkle_root: {
                merkle_root: string;
            };
        }
        export interface Claim {
            claim: {
                amount: Uint128;
                proof: string[];
                stage: uint8;
            };
        }
    }
    export interface InstantiateMsg {
        anchor_token: string;
        owner: string;
    }
    export interface LatestStageResponse {
        latest_stage: uint8;
    }
    export interface MerkleRootResponse {
        merkle_root: string;
        stage: uint8;
    }
    export namespace QueryMsg {
        export interface Config {
            config: {};
        }
        export interface MerkleRoot {
            merkle_root: {
                stage: uint8;
            };
        }
        export interface LatestStage {
            latest_stage: {};
        }
        export interface IsClaimed {
            is_claimed: {
                address: string;
                stage: uint8;
            };
        }
    }
}
export namespace collector {
    export interface ConfigResponse {
        anchor_token: string;
        distributor_contract: string;
        gov_contract: string;
        reward_factor: Decimal;
        terraswap_factory: string;
    }
    export namespace ExecuteMsg {
        export interface UpdateConfig {
            update_config: {
                reward_factor?: Decimal | null;
            };
        }
        export interface Sweep {
            sweep: {
                denom: string;
            };
        }
    }
    export interface InstantiateMsg {
        anchor_token: string;
        distributor_contract: string;
        gov_contract: string;
        reward_factor: Decimal;
        terraswap_factory: string;
    }
    export namespace QueryMsg {
        export interface Config {
            config: {};
        }
    }
}
export namespace community {
    export interface ConfigResponse {
        anchor_token: string;
        gov_contract: string;
        spend_limit: Uint128;
    }
    export namespace ExecuteMsg {
        export interface UpdateConfig {
            update_config: {
                spend_limit?: Uint128 | null;
            };
        }
        export interface Spend {
            spend: {
                amount: Uint128;
                recipient: string;
            };
        }
    }
    export interface InstantiateMsg {
        anchor_token: string;
        gov_contract: string;
        spend_limit: Uint128;
    }
    export namespace QueryMsg {
        export interface Config {
            config: {};
        }
    }
}
export namespace custodyBeth {
    export interface BorrowerResponse {
        balance: Uint256;
        borrower: string;
        spendable: Uint256;
    }
    export interface BorrowersResponse {
        borrowers: BorrowerResponse[];
    }
    export interface ConfigResponse {
        basset_info: BAssetInfo;
        collateral_token: string;
        liquidation_contract: string;
        market_contract: string;
        overseer_contract: string;
        owner: string;
        reward_contract: string;
        stable_denom: string;
    }
    export namespace Cw20HookMsg {
        export interface DepositCollateral {
            deposit_collateral: {};
        }
    }
    export namespace ExecuteMsg {
        export interface Receive {
            receive: Cw20ReceiveMsg;
        }
        export interface UpdateConfig {
            update_config: {
                liquidation_contract?: string | null;
                owner?: string | null;
            };
        }
        export interface LockCollateral {
            lock_collateral: {
                amount: Uint256;
                borrower: string;
            };
        }
        export interface UnlockCollateral {
            unlock_collateral: {
                amount: Uint256;
                borrower: string;
            };
        }
        export interface DistributeRewards {
            distribute_rewards: {};
        }
        export interface LiquidateCollateral {
            liquidate_collateral: {
                amount: Uint256;
                borrower: string;
                liquidator: string;
            };
        }
        export interface WithdrawCollateral {
            withdraw_collateral: {
                amount?: Uint256 | null;
            };
        }
    }
    export interface InstantiateMsg {
        basset_info: BAssetInfo;
        /**bAsset token address*/
        collateral_token: string;
        /**liquidation contract address*/
        liquidation_contract: string;
        /**market contract address*/
        market_contract: string;
        /**overseer contract address*/
        overseer_contract: string;
        /**owner address*/
        owner: string;
        /**bAsset rewrad contract*/
        reward_contract: string;
        /**Expected reward denom. If bAsset reward is not same with it, we try to convert the reward to the `stable_denom`.*/
        stable_denom: string;
    }
    export namespace QueryMsg {
        export interface Config {
            config: {};
        }
        export interface Borrower {
            borrower: {
                address: string;
            };
        }
        export interface Borrowers {
            borrowers: {
                limit?: uint32 | null;
                start_after?: string | null;
            };
        }
    }
}
export namespace custodyBluna {
    export interface BorrowerResponse {
        balance: Uint256;
        borrower: string;
        spendable: Uint256;
    }
    export interface BorrowersResponse {
        borrowers: BorrowerResponse[];
    }
    export interface ConfigResponse {
        basset_info: BAssetInfo;
        collateral_token: string;
        liquidation_contract: string;
        market_contract: string;
        overseer_contract: string;
        owner: string;
        reward_contract: string;
        stable_denom: string;
    }
    export namespace Cw20HookMsg {
        export interface DepositCollateral {
            deposit_collateral: {};
        }
    }
    export namespace ExecuteMsg {
        export interface Receive {
            receive: Cw20ReceiveMsg;
        }
        export interface UpdateConfig {
            update_config: {
                liquidation_contract?: string | null;
                owner?: string | null;
            };
        }
        export interface LockCollateral {
            lock_collateral: {
                amount: Uint256;
                borrower: string;
            };
        }
        export interface UnlockCollateral {
            unlock_collateral: {
                amount: Uint256;
                borrower: string;
            };
        }
        export interface DistributeRewards {
            distribute_rewards: {};
        }
        export interface LiquidateCollateral {
            liquidate_collateral: {
                amount: Uint256;
                borrower: string;
                liquidator: string;
            };
        }
        export interface WithdrawCollateral {
            withdraw_collateral: {
                amount?: Uint256 | null;
            };
        }
    }
    export interface InstantiateMsg {
        basset_info: BAssetInfo;
        /**bAsset token address*/
        collateral_token: string;
        /**liquidation contract address*/
        liquidation_contract: string;
        /**market contract address*/
        market_contract: string;
        /**overseer contract address*/
        overseer_contract: string;
        /**owner address*/
        owner: string;
        /**bAsset rewrad contract*/
        reward_contract: string;
        /**Expected reward denom. If bAsset reward is not same with it, we try to convert the reward to the `stable_denom`.*/
        stable_denom: string;
    }
    export namespace QueryMsg {
        export interface Config {
            config: {};
        }
        export interface Borrower {
            borrower: {
                address: string;
            };
        }
        export interface Borrowers {
            borrowers: {
                limit?: uint32 | null;
                start_after?: string | null;
            };
        }
    }
}
export namespace distributionModel {
    export interface AncEmissionRateResponse {
        emission_rate: Decimal256;
    }
    export interface ConfigResponse {
        decrement_multiplier: Decimal256;
        emission_cap: Decimal256;
        emission_floor: Decimal256;
        increment_multiplier: Decimal256;
        owner: string;
    }
    export namespace ExecuteMsg {
        export interface UpdateConfig {
            update_config: {
                decrement_multiplier?: Decimal256 | null;
                emission_cap?: Decimal256 | null;
                emission_floor?: Decimal256 | null;
                increment_multiplier?: Decimal256 | null;
                owner?: string | null;
            };
        }
    }
    export interface InstantiateMsg {
        decrement_multiplier: Decimal256;
        emission_cap: Decimal256;
        emission_floor: Decimal256;
        increment_multiplier: Decimal256;
        owner: string;
    }
    export namespace QueryMsg {
        export interface Config {
            config: {};
        }
        export interface AncEmissionRate {
            anc_emission_rate: {
                current_emission_rate: Decimal256;
                deposit_rate: Decimal256;
                target_deposit_rate: Decimal256;
                threshold_deposit_rate: Decimal256;
            };
        }
    }
}
export namespace distributor {
    export interface ConfigResponse {
        anchor_token: string;
        gov_contract: string;
        spend_limit: Uint128;
        whitelist: string[];
    }
    export namespace ExecuteMsg {
        export interface UpdateConfig {
            update_config: {
                spend_limit?: Uint128 | null;
            };
        }
        export interface Spend {
            spend: {
                amount: Uint128;
                recipient: string;
            };
        }
        export interface AddDistributor {
            add_distributor: {
                distributor: string;
            };
        }
        export interface RemoveDistributor {
            remove_distributor: {
                distributor: string;
            };
        }
    }
    export interface InstantiateMsg {
        anchor_token: string;
        gov_contract: string;
        spend_limit: Uint128;
        whitelist: string[];
    }
    export namespace QueryMsg {
        export interface Config {
            config: {};
        }
    }
}
export namespace gov {
    export interface ConfigResponse {
        anchor_token: string;
        owner: string;
        proposal_deposit: Uint128;
        quorum: Decimal;
        snapshot_period: uint64;
        threshold: Decimal;
        timelock_period: uint64;
        voting_period: uint64;
    }
    export namespace Cw20HookMsg {
        export interface StakeVotingTokens {
            stake_voting_tokens: {};
        }
        export interface CreatePoll {
            create_poll: {
                description: string;
                execute_msgs?: PollExecuteMsg | null;
                link?: string | null;
                title: string;
            };
        }
    }
    export namespace ExecuteMsg {
        export interface Receive {
            receive: Cw20ReceiveMsg;
        }
        export interface ExecutePollMsgs {
            execute_poll_msgs: {
                poll_id: uint64;
            };
        }
        export interface RegisterContracts {
            register_contracts: {
                anchor_token: string;
            };
        }
        export interface UpdateConfig {
            update_config: {
                owner?: string | null;
                proposal_deposit?: Uint128 | null;
                quorum?: Decimal | null;
                snapshot_period?: uint64 | null;
                threshold?: Decimal | null;
                timelock_period?: uint64 | null;
                voting_period?: uint64 | null;
            };
        }
        export interface CastVote {
            cast_vote: {
                amount: Uint128;
                poll_id: uint64;
                vote: VoteOption;
            };
        }
        export interface WithdrawVotingTokens {
            withdraw_voting_tokens: {
                amount?: Uint128 | null;
            };
        }
        export interface EndPoll {
            end_poll: {
                poll_id: uint64;
            };
        }
        export interface ExecutePoll {
            execute_poll: {
                poll_id: uint64;
            };
        }
        export interface SnapshotPoll {
            snapshot_poll: {
                poll_id: uint64;
            };
        }
    }
    export interface InstantiateMsg {
        proposal_deposit: Uint128;
        quorum: Decimal;
        snapshot_period: uint64;
        threshold: Decimal;
        timelock_period: uint64;
        voting_period: uint64;
    }
    export interface PollResponse {
        creator: string;
        deposit_amount: Uint128;
        description: string;
        end_height: uint64;
        execute_data?: PollExecuteMsg | null;
        id: uint64;
        link?: string | null;
        no_votes: Uint128;
        staked_amount?: Uint128 | null;
        status: PollStatus;
        title: string;
        total_balance_at_end_poll?: Uint128 | null;
        yes_votes: Uint128;
    }
    export namespace QueryMsg {
        export interface Config {
            config: {};
        }
        export interface State {
            state: {};
        }
        export interface Staker {
            staker: {
                address: string;
            };
        }
        export interface Poll {
            poll: {
                poll_id: uint64;
            };
        }
        export interface Polls {
            polls: {
                filter?: PollStatus | null;
                limit?: uint32 | null;
                order_by?: OrderBy | null;
                start_after?: uint64 | null;
            };
        }
        export interface Voters {
            voters: {
                limit?: uint32 | null;
                order_by?: OrderBy | null;
                poll_id: uint64;
                start_after?: string | null;
            };
        }
    }
    export interface StakerResponse {
        balance: Uint128;
        locked_balance: [
            uint64,
            VoterInfo
        ];
        share: Uint128;
    }
}
export namespace interestModel {
    export interface BorrowRateResponse {
        rate: Decimal256;
    }
    export interface ConfigResponse {
        base_rate: Decimal256;
        interest_multiplier: Decimal256;
        owner: string;
    }
    export namespace ExecuteMsg {
        export interface UpdateConfig {
            update_config: {
                base_rate?: Decimal256 | null;
                interest_multiplier?: Decimal256 | null;
                owner?: string | null;
            };
        }
    }
    export interface InstantiateMsg {
        base_rate: Decimal256;
        interest_multiplier: Decimal256;
        owner: string;
    }
    export namespace QueryMsg {
        export interface Config {
            config: {};
        }
        export interface BorrowRate {
            borrow_rate: {
                market_balance: Uint256;
                total_liabilities: Decimal256;
                total_reserves: Decimal256;
            };
        }
    }
}
export namespace liquidation {
    export interface BidResponse {
        amount: Uint256;
        bidder: string;
        collateral_token: string;
        premium_rate: Decimal256;
    }
    export interface BidsResponse {
        bids: BidResponse[];
    }
    export interface ConfigResponse {
        bid_fee: Decimal256;
        liquidation_threshold: Uint256;
        max_premium_rate: Decimal256;
        oracle_contract: string;
        owner: string;
        price_timeframe: uint64;
        safe_ratio: Decimal256;
        stable_denom: string;
    }
    export namespace Cw20HookMsg {
        export interface ExecuteBid {
            execute_bid: {
                fee_address?: string | null;
                liquidator: string;
                repay_address?: string | null;
            };
        }
    }
    export namespace ExecuteMsg {
        export interface Receive {
            receive: Cw20ReceiveMsg;
        }
        export interface UpdateConfig {
            update_config: {
                bid_fee?: Decimal256 | null;
                liquidation_threshold?: Uint256 | null;
                max_premium_rate?: Decimal256 | null;
                oracle_contract?: string | null;
                owner?: string | null;
                price_timeframe?: uint64 | null;
                safe_ratio?: Decimal256 | null;
                stable_denom?: string | null;
            };
        }
        export interface SubmitBid {
            submit_bid: {
                collateral_token: string;
                premium_rate: Decimal256;
            };
        }
        export interface RetractBid {
            retract_bid: {
                amount?: Uint256 | null;
                collateral_token: string;
            };
        }
    }
    export interface InstantiateMsg {
        /**Fee applied to executed bids Sent to Overseer interest buffer*/
        bid_fee: Decimal256;
        /**Liquidation threshold amount in stable denom. When the current collaterals value is smaller than the threshold, all collaterals will be liquidated*/
        liquidation_threshold: Uint256;
        /**Maximum fee applied to liquidated collaterals Sent to liquidator as incentive*/
        max_premium_rate: Decimal256;
        oracle_contract: string;
        owner: string;
        /**Valid oracle price timeframe*/
        price_timeframe: uint64;
        /**borrow_amount / borrow_limit must always be bigger than safe_ratio.*/
        safe_ratio: Decimal256;
        stable_denom: string;
    }
    export interface LiquidationAmountResponse {
        collaterals: [
            string,
            Uint256
        ];
    }
    export namespace QueryMsg {
        export interface Config {
            config: {};
        }
        export interface LiquidationAmount {
            liquidation_amount: {
                borrow_amount: Uint256;
                borrow_limit: Uint256;
                collateral_prices: Decimal256[];
                collaterals: [
                    string,
                    Uint256
                ];
            };
        }
        export interface Bid {
            bid: {
                bidder: string;
                collateral_token: string;
            };
        }
        export interface BidsByUser {
            bids_by_user: {
                bidder: string;
                limit?: uint32 | null;
                start_after?: string | null;
            };
        }
        export interface BidsByCollateral {
            bids_by_collateral: {
                collateral_token: string;
                limit?: uint32 | null;
                start_after?: string | null;
            };
        }
    }
}
export namespace liquidationQueue {
    export interface BidPoolResponse {
        current_epoch: Uint128;
        current_scale: Uint128;
        premium_rate: Decimal256;
        product_snapshot: Decimal256;
        sum_snapshot: Decimal256;
        total_bid_amount: Uint256;
    }
    export interface BidPoolsResponse {
        bid_pools: BidPoolResponse[];
    }
    export interface BidResponse {
        amount: Uint256;
        bidder: string;
        collateral_token: string;
        epoch_snapshot: Uint128;
        idx: Uint128;
        pending_liquidated_collateral: Uint256;
        premium_slot: uint8;
        product_snapshot: Decimal256;
        scale_snapshot: Uint128;
        sum_snapshot: Decimal256;
        wait_end?: uint64 | null;
    }
    export interface BidsResponse {
        bids: BidResponse[];
    }
    export interface CollateralInfoResponse {
        bid_threshold: Uint256;
        collateral_token: string;
        max_slot: uint8;
        premium_rate_per_slot: Decimal256;
    }
    export interface ConfigResponse {
        bid_fee: Decimal256;
        liquidation_threshold: Uint256;
        liquidator_fee: Decimal256;
        oracle_contract: string;
        overseer: string;
        owner: string;
        price_timeframe: uint64;
        safe_ratio: Decimal256;
        stable_denom: string;
        waiting_period: uint64;
    }
    export namespace Cw20HookMsg {
        export interface ExecuteBid {
            execute_bid: {
                fee_address?: string | null;
                liquidator: string;
                repay_address?: string | null;
            };
        }
    }
    export namespace ExecuteMsg {
        export interface Receive {
            receive: Cw20ReceiveMsg;
        }
        export interface UpdateConfig {
            update_config: {
                bid_fee?: Decimal256 | null;
                liquidation_threshold?: Uint256 | null;
                liquidator_fee?: Decimal256 | null;
                oracle_contract?: string | null;
                overseer?: string | null;
                owner?: string | null;
                price_timeframe?: uint64 | null;
                safe_ratio?: Decimal256 | null;
                waiting_period?: uint64 | null;
            };
        }
        export interface WhitelistCollateral {
            whitelist_collateral: {
                bid_threshold: Uint256;
                collateral_token: string;
                max_slot: uint8;
                premium_rate_per_slot: Decimal256;
            };
        }
        export interface UpdateCollateralInfo {
            update_collateral_info: {
                bid_threshold?: Uint256 | null;
                collateral_token: string;
                max_slot?: uint8 | null;
            };
        }
        export interface SubmitBid {
            submit_bid: {
                collateral_token: string;
                premium_slot: uint8;
            };
        }
        export interface RetractBid {
            retract_bid: {
                amount?: Uint256 | null;
                bid_idx: Uint128;
            };
        }
        export interface ActivateBids {
            activate_bids: {
                bids_idx?: Uint128 | null;
                collateral_token: string;
            };
        }
        export interface ClaimLiquidations {
            claim_liquidations: {
                bids_idx?: Uint128 | null;
                collateral_token: string;
            };
        }
    }
    export interface InstantiateMsg {
        /**Fee applied to executed bids Sent to Overseer interest buffer*/
        bid_fee: Decimal256;
        /**Liquidation threshold amount in stable denom. When the current collaterals value is smaller than the threshold, all collaterals will be liquidated*/
        liquidation_threshold: Uint256;
        /**Fee applied to executed bids Sent to the address executing the liquidation*/
        liquidator_fee: Decimal256;
        oracle_contract: string;
        overseer: string;
        owner: string;
        /**Valid oracle price timeframe*/
        price_timeframe: uint64;
        /**borrow_amount / borrow_limit must always be bigger than safe_ratio.*/
        safe_ratio: Decimal256;
        stable_denom: string;
        /**Time period that needs to pass for a bid to be activated (seconds)*/
        waiting_period: uint64;
    }
    export interface LiquidationAmountResponse {
        collaterals: [
            string,
            Uint256
        ];
    }
    export namespace QueryMsg {
        export interface Config {
            config: {};
        }
        export interface LiquidationAmount {
            liquidation_amount: {
                borrow_amount: Uint256;
                borrow_limit: Uint256;
                collateral_prices: Decimal256[];
                collaterals: [
                    string,
                    Uint256
                ];
            };
        }
        export interface CollateralInfo {
            collateral_info: {
                collateral_token: string;
            };
        }
        export interface Bid {
            bid: {
                bid_idx: Uint128;
            };
        }
        export interface BidsByUser {
            bids_by_user: {
                bidder: string;
                collateral_token: string;
                limit?: uint8 | null;
                start_after?: Uint128 | null;
            };
        }
        export interface BidPool {
            bid_pool: {
                bid_slot: uint8;
                collateral_token: string;
            };
        }
        export interface BidPoolsByCollateral {
            bid_pools_by_collateral: {
                collateral_token: string;
                limit?: uint8 | null;
                start_after?: uint8 | null;
            };
        }
    }
}
export namespace market {
    export interface BorrowerInfoResponse {
        borrower: string;
        interest_index: Decimal256;
        loan_amount: Uint256;
        pending_rewards: Decimal256;
        reward_index: Decimal256;
    }
    export interface BorrowerInfosResponse {
        borrower_infos: BorrowerInfoResponse[];
    }
    export interface ConfigResponse {
        aterra_contract: string;
        collector_contract: string;
        distribution_model: string;
        distributor_contract: string;
        interest_model: string;
        max_borrow_factor: Decimal256;
        overseer_contract: string;
        owner_addr: string;
        stable_denom: string;
    }
    export namespace Cw20HookMsg {
        export interface RedeemStable {
            redeem_stable: {};
        }
    }
    export interface EpochStateResponse {
        aterra_supply: Uint256;
        exchange_rate: Decimal256;
    }
    export namespace ExecuteMsg {
        export interface Receive {
            receive: Cw20ReceiveMsg;
        }
        export interface RegisterContracts {
            register_contracts: {
                /**Collector contract to send all the reserve*/
                collector_contract: string;
                /**The contract has the logics for ANC distribution speed*/
                distribution_model: string;
                /**Faucet contract to drip ANC token to users*/
                distributor_contract: string;
                /**The contract has the logics for Anchor borrow interest rate*/
                interest_model: string;
                overseer_contract: string;
            };
        }
        export interface UpdateConfig {
            update_config: {
                distribution_model?: string | null;
                interest_model?: string | null;
                max_borrow_factor?: Decimal256 | null;
                owner_addr?: string | null;
            };
        }
        export interface RepayStableFromLiquidation {
            repay_stable_from_liquidation: {
                borrower: string;
                prev_balance: Uint256;
            };
        }
        export interface ExecuteEpochOperations {
            execute_epoch_operations: {
                deposit_rate: Decimal256;
                distributed_interest: Uint256;
                target_deposit_rate: Decimal256;
                threshold_deposit_rate: Decimal256;
            };
        }
        export interface DepositStable {
            deposit_stable: {};
        }
        export interface BorrowStable {
            borrow_stable: {
                borrow_amount: Uint256;
                to?: string | null;
            };
        }
        export interface RepayStable {
            repay_stable: {};
        }
        export interface ClaimRewards {
            claim_rewards: {
                to?: string | null;
            };
        }
    }
    export interface InstantiateMsg {
        /**Anchor token distribution speed*/
        anc_emission_rate: Decimal256;
        /**Anchor token code ID used to instantiate*/
        aterra_code_id: uint64;
        /**Maximum allowed borrow rate over deposited stable balance*/
        max_borrow_factor: Decimal256;
        /**Owner address for config update*/
        owner_addr: string;
        /**stable coin denom used to borrow & repay*/
        stable_denom: string;
    }
    export namespace QueryMsg {
        export interface Config {
            config: {};
        }
        export interface State {
            state: {
                block_height?: uint64 | null;
            };
        }
        export interface EpochState {
            epoch_state: {
                block_height?: uint64 | null;
                distributed_interest?: Uint256 | null;
            };
        }
        export interface BorrowerInfo {
            borrower_info: {
                block_height?: uint64 | null;
                borrower: string;
            };
        }
        export interface BorrowerInfos {
            borrower_infos: {
                limit?: uint32 | null;
                start_after?: string | null;
            };
        }
    }
    export interface State {
        anc_emission_rate: Decimal256;
        global_interest_index: Decimal256;
        global_reward_index: Decimal256;
        last_interest_updated: uint64;
        last_reward_updated: uint64;
        prev_aterra_supply: Uint256;
        prev_exchange_rate: Decimal256;
        total_liabilities: Decimal256;
        total_reserves: Decimal256;
    }
}
export namespace oracle {
    export interface ConfigResponse {
        base_asset: string;
        owner: string;
    }
    export namespace ExecuteMsg {
        export interface UpdateConfig {
            update_config: {
                owner?: string | null;
            };
        }
        export interface RegisterFeeder {
            register_feeder: {
                asset: string;
                feeder: string;
            };
        }
        export interface FeedPrice {
            feed_price: {
                prices: [
                    string,
                    Decimal256
                ];
            };
        }
    }
    export interface InstantiateMsg {
        base_asset: string;
        owner: string;
    }
    export interface PriceResponse {
        last_updated_base: uint64;
        last_updated_quote: uint64;
        rate: Decimal256;
    }
    export interface PricesResponse {
        prices: PricesResponseElem[];
    }
    export namespace QueryMsg {
        export interface Config {
            config: {};
        }
        export interface Feeder {
            feeder: {
                asset: string;
            };
        }
        export interface Price {
            price: {
                base: string;
                quote: string;
            };
        }
        export interface Prices {
            prices: {
                limit?: uint32 | null;
                start_after?: string | null;
            };
        }
    }
}
export namespace overseer {
    export interface AllCollateralsResponse {
        all_collaterals: CollateralsResponse[];
    }
    export interface BorrowLimitResponse {
        borrow_limit: Uint256;
        borrower: string;
    }
    export interface CollateralsResponse {
        borrower: string;
        collaterals: [
            string,
            Uint256
        ];
    }
    export interface ConfigResponse {
        anc_purchase_factor: Decimal256;
        buffer_distribution_factor: Decimal256;
        collector_contract: string;
        epoch_period: uint64;
        liquidation_contract: string;
        market_contract: string;
        oracle_contract: string;
        owner_addr: string;
        price_timeframe: uint64;
        stable_denom: string;
        target_deposit_rate: Decimal256;
        threshold_deposit_rate: Decimal256;
    }
    export interface EpochState {
        deposit_rate: Decimal256;
        last_executed_height: uint64;
        prev_aterra_supply: Uint256;
        prev_exchange_rate: Decimal256;
        prev_interest_buffer: Uint256;
    }
    export namespace ExecuteMsg {
        export interface UpdateConfig {
            update_config: {
                anc_purchase_factor?: Decimal256 | null;
                buffer_distribution_factor?: Decimal256 | null;
                epoch_period?: uint64 | null;
                liquidation_contract?: string | null;
                oracle_contract?: string | null;
                owner_addr?: string | null;
                price_timeframe?: uint64 | null;
                target_deposit_rate?: Decimal256 | null;
                threshold_deposit_rate?: Decimal256 | null;
            };
        }
        export interface Whitelist {
            whitelist: {
                collateral_token: string;
                custody_contract: string;
                max_ltv: Decimal256;
                name: string;
                symbol: string;
            };
        }
        export interface UpdateWhitelist {
            update_whitelist: {
                collateral_token: string;
                custody_contract?: string | null;
                max_ltv?: Decimal256 | null;
            };
        }
        export interface ExecuteEpochOperations {
            execute_epoch_operations: {};
        }
        export interface UpdateEpochState {
            update_epoch_state: {
                distributed_interest: Uint256;
                interest_buffer: Uint256;
            };
        }
        export interface LockCollateral {
            lock_collateral: {
                collaterals: [
                    string,
                    Uint256
                ];
            };
        }
        export interface UnlockCollateral {
            unlock_collateral: {
                collaterals: [
                    string,
                    Uint256
                ];
            };
        }
        export interface LiquidateCollateral {
            liquidate_collateral: {
                borrower: string;
            };
        }
    }
    export interface InstantiateMsg {
        /**Ratio to be used for purchasing ANC token from the interest buffer*/
        anc_purchase_factor: Decimal256;
        /**Ratio to be distributed from the interest buffer*/
        buffer_distribution_factor: Decimal256;
        /**Collector contract address which is purchasing ANC token*/
        collector_contract: string;
        epoch_period: uint64;
        /**Liquidation model contract address to compute liquidation amount*/
        liquidation_contract: string;
        /**Market contract address to receive missing interest buffer*/
        market_contract: string;
        /**Oracle contract address for collateral tokens*/
        oracle_contract: string;
        /**Initial owner address*/
        owner_addr: string;
        /**Valid oracle price timeframe*/
        price_timeframe: uint64;
        /**The base denomination used when fetching oracle price, reward distribution, and borrow*/
        stable_denom: string;
        /**Target deposit rate. When current deposit rate is bigger than this, Custody contracts send rewards to interest buffer*/
        target_deposit_rate: Decimal256;
        /**Distribute interest buffer to market contract, when deposit_rate < threshold_deposit_rate*/
        threshold_deposit_rate: Decimal256;
    }
    export namespace QueryMsg {
        export interface Config {
            config: {};
        }
        export interface EpochState {
            epoch_state: {};
        }
        export interface Whitelist {
            whitelist: {
                collateral_token?: string | null;
                limit?: uint32 | null;
                start_after?: string | null;
            };
        }
        export interface Collaterals {
            collaterals: {
                borrower: string;
            };
        }
        export interface AllCollaterals {
            all_collaterals: {
                limit?: uint32 | null;
                start_after?: string | null;
            };
        }
        export interface BorrowLimit {
            borrow_limit: {
                block_time?: uint64 | null;
                borrower: string;
            };
        }
    }
    export interface WhitelistResponse {
        elems: WhitelistResponseElem[];
    }
}
export namespace staking {
    export interface ConfigResponse {
        anchor_token: string;
        distribution_schedule: [
            uint64,
            uint64,
            Uint128
        ];
        staking_token: string;
    }
    export namespace Cw20HookMsg {
        export interface Bond {
            bond: {};
        }
    }
    export namespace ExecuteMsg {
        export interface Receive {
            receive: Cw20ReceiveMsg;
        }
        export interface Unbond {
            unbond: {
                amount: Uint128;
            };
        }
        export interface Withdraw {
            withdraw: {};
        }
        export interface MigrateStaking {
            migrate_staking: {
                new_staking_contract: string;
            };
        }
    }
    export interface InstantiateMsg {
        anchor_token: string;
        distribution_schedule: [
            uint64,
            uint64,
            Uint128
        ];
        staking_token: string;
    }
    export namespace QueryMsg {
        export interface Config {
            config: {};
        }
        export interface State {
            state: {
                block_height?: uint64 | null;
            };
        }
        export interface StakerInfo {
            staker_info: {
                block_height?: uint64 | null;
                staker: string;
            };
        }
    }
    export interface StakerInfoResponse {
        bond_amount: Uint128;
        pending_reward: Uint128;
        reward_index: Decimal;
        staker: string;
    }
    export interface StateResponse {
        global_reward_index: Decimal;
        last_distributed: uint64;
        total_bond_amount: Uint128;
    }
}
export namespace vesting {
    export interface ConfigResponse {
        anchor_token: string;
        genesis_time: uint64;
        owner: string;
    }
    export namespace ExecuteMsg {
        export interface UpdateConfig {
            update_config: {
                anchor_token?: string | null;
                genesis_time?: uint64 | null;
                owner?: string | null;
            };
        }
        export interface RegisterVestingAccounts {
            register_vesting_accounts: {
                vesting_accounts: VestingAccount[];
            };
        }
        export interface Claim {
            claim: {};
        }
    }
    export interface InstantiateMsg {
        anchor_token: string;
        genesis_time: uint64;
        owner: string;
    }
    export namespace QueryMsg {
        export interface Config {
            config: {};
        }
        export interface VestingAccount {
            vesting_account: {
                address: string;
            };
        }
        export interface VestingAccounts {
            vesting_accounts: {
                limit?: uint32 | null;
                order_by?: OrderBy | null;
                start_after?: string | null;
            };
        }
    }
    export interface VestingAccountResponse {
        address: string;
        info: VestingInfo;
    }
    export interface VestingAccountsResponse {
        vesting_accounts: VestingAccountResponse[];
    }
}
