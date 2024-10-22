import { NextResponse } from "next/server";
import DBConnect from "../../../lib/DBConnect";
import Task from "../../../models/Taks";

export async function GET(req) {
  await DBConnect();
  try {
    // Get query parameters
    const search = req.nextUrl.searchParams.get("search");
    const status = req.nextUrl.searchParams.get("status");
    const priority = req.nextUrl.searchParams.get("priority");
    const tags = req.nextUrl.searchParams.get("tags");

    console.log(req.nextUrl.searchParams);

    const query = {};

    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    console.log("query 1", query);

    // Status filter
    if (status) {
      query.completed = status === "completed"; // Directly assign boolean value based on status
    }
    console.log("query 2", query);

    // Priority filter
    if (priority) {
      query.priority = priority;
    }

    // Tags filter
    if (tags) {
      query.tags = { $in: tags.split(",") }; // Ensure tags are an array
    }

    const tasks = await Task.find(query);
    return NextResponse.json({ success: true, data: tasks }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch tasks." },
      { status: 500 }
    );
  }
}
