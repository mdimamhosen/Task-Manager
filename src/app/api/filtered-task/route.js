import { NextResponse } from "next/server";
import DBConnect from "../../../lib/DBConnect";
import Task from "../../../models/Taks";

export async function GET(req) {
  await DBConnect();
  try {
    // Getint query parameters
    const search = req.nextUrl.searchParams.get("search");
    const status = req.nextUrl.searchParams.get("status");
    const priority = req.nextUrl.searchParams.get("priority");
    const tags = req.nextUrl.searchParams.get("tags");

    console.log(req.nextUrl.searchParams);

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    // If a search parameter is provided, add a regex condition to match task name or description

    if (status) {
      query.completed = status === "completed";
    }

    if (priority) {
      query.priority = priority;
    }

    if (tags) {
      query.tags = { $in: tags.split(",") };
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
  // The logic above constructs a MongoDB query based on optional query parameters: search, status, priority, and tags.
  // It uses regex for case-insensitive matching in search, filters based on task completion status,
  // sets priority if specified, and checks for tags using the $in operator. Finally, it fetches the matching tasks
  // and returns them as a JSON response, handling any errors gracefully.
}
