import { Router, Response } from "express";
import { protect, AuthenticatedRequest } from "../middleware/authMiddleware";

const router = Router();

/**
 * ROUTE: POST /api/orders/checkout
 * DESC:  Process checkout for an authenticated user
 * ACCESS: Private (Requires valid JWT token)
 */

router.post('/checkout', protect, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { cartItems } = req.body;
        const userId = req.user?.id;

        if(!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: 'Cannot checkout an empty shopping cart.' });
        }
        console.log(`Order Received! User ${userId} successfully ordered ${cartItems.length} items.`);

        return res.status(200).json({
            success: true,
            message: 'Thank you for your order! Your purchase has been successfully processed.',
        })
    } catch (error) {
        return res.status(500).json({ message: 'Checkout failed server-side. orderRoutes.ts', error: (error as Error).message });
    }
});

export default router;