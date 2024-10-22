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

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    console.log("query 1", query);

    if (status) {
      query.completed = status === "completed";
    }
    console.log("query 2", query);

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
}
