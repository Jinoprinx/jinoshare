import { Collection, FindOptions } from "mongodb";
import getClientPromise from "./mongodb";
import { ISharedPost } from "@jino/common";

const DB_NAME = "jino-social";
const COLLECTION = "posts";

async function getCollection(): Promise<Collection<ISharedPost>> {
  const client = await getClientPromise();
  const db = client.db(DB_NAME);
  return db.collection<ISharedPost>(COLLECTION);
}

export async function getAll(userId: string): Promise<ISharedPost[]> {
  const collection = await getCollection();
  // sort by createdAt descending
  const options: FindOptions<ISharedPost> = {
    sort: { createdAt: -1 },
  };
  const posts = await collection.find({ userId }, options).toArray();
  return posts;
}

export async function upsert(post: ISharedPost) {
  const collection = await getCollection();
  await collection.updateOne(
    { _id: post._id as any },
    { $set: post },
    { upsert: true }
  );
  return post;
}

export async function remove(id: string) {
  const collection = await getCollection();
  await collection.deleteOne({ _id: id as any });
}

export async function get(id:string) {
  const collection = await getCollection();
  const post = await collection.findOne({ _id: id as any });
  return post;
}