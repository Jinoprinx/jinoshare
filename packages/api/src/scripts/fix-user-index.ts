import { connectDb } from "../../../common/dist/db";
import { User } from "../models/User";

async function fixUserIndexes() {
  try {
    await connectDb();
    console.log("Connected to database");

    // Get the collection directly
    const collection = User.collection;

    // List all indexes on the users collection
    const indexes = await collection.listIndexes().toArray();
    console.log("Current indexes:", indexes);

    // Check if there's a userId index
    const userIdIndex = indexes.find(index =>
      index.name === 'userId_1' ||
      (index.key && index.key.userId)
    );

    if (userIdIndex) {
      console.log("Found problematic userId index:", userIdIndex);

      // Drop the userId index
      await collection.dropIndex(userIdIndex.name);
      console.log(`Dropped index: ${userIdIndex.name}`);
    } else {
      console.log("No userId index found");
    }

    // Ensure email index exists
    try {
      await collection.createIndex({ email: 1 }, { unique: true, sparse: true });
      console.log("Ensured email index exists");
    } catch (error) {
      console.log("Email index already exists or created");
    }

    console.log("Index fix completed successfully");

  } catch (error) {
    console.error("Error fixing indexes:", error);
    throw error;
  } finally {
    process.exit(0);
  }
}

fixUserIndexes().catch(console.error);