// User Model
/**
 * User data to store:
 * name: string
 * lastName: string
 * email: string
 * password: string (only optional if "isLinkedWithGoogle")
 * isLinkedWithGoogle?: boolean
 * passwordResetToken?: string
 * orders?: [Order]
 * lists: [List] (In that, there must be the favorite list at top.)
 * billingDetails?: BillingDetails (A different schema)
 * profileImage?: string
 * reviews?: [Review]
 * isSubscribed: boolean
 * cart: Cart
 */
