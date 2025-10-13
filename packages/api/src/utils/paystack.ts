
import paystack from "paystack";

const paystackInstance = paystack(process.env.PAYSTACK_SECRET_KEY || "");

export const initializeTransaction = async (email: string, amount: number) => {
  try {
    const response = await paystackInstance.transaction.initialize({
      email,
      amount: amount * 100, // Paystack expects amount in kobo
    });
    return response;
  } catch (error) {
    console.error("Paystack initialization error:", error);
    throw error;
  }
};

export const verifyTransaction = async (reference: string) => {
  try {
    const response = await paystackInstance.transaction.verify(reference);
    return response;
  } catch (error) {
    console.error("Paystack verification error:", error);
    throw error;
  }
};
