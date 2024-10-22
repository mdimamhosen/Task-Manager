import { NextResponse } from "next/server";
import DBConnect from "../../../lib/DBConnect";
import Task from "../../../models/Taks";
export async function GET(req) {
  await DBConnect();
  try {
    const distinctTags = await Task.aggregate([
      { $unwind: "$tags" },
      { $group: { _id: "$tags" } },
      { $sort: { _id: 1 } },
    ]);

    const tags = distinctTags.map((tag) => tag._id);

    return NextResponse.json({ success: true, data: tags }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch tags." },
      { status: 500 }
    );
  }
}
