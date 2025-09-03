"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyPost = emptyPost;
function emptyPost() {
    const now = new Date().toISOString();
    return {
        id: crypto.randomUUID(),
        content: "",
        status: "draft",
        channels: [],
        createdAt: now,
        updatedAt: now,
    };
}
