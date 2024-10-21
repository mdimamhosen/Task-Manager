import DBConnect from "@/lib/DBConnect";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import Task from "@/models/Taks";

export async function PUT(req, { params }) {
  await DBConnect();
  try {
    const { id } = params;
    const updates = await req.json();

    console.log({
      id: id,
      updates: updates,
    });

    // Validate the required fields
    if (!id || !updates) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields.",
        },
        {
          status: 400,
        }
      );
    }

    // Ensure the ID is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid task ID.",
        },
        {
          status: 400,
        }
      );
    }

    // Update the task in the database
    const updatedTask = await Task.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators
    });

    // Check if the task was found and updated
    if (!updatedTask) {
      return NextResponse.json(
        {
          success: false,
          message: "Task not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: updatedTask,
        message: "Task updated successfully!",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update task.",
      },
      {
        status: 500,
      }
    );
  }
}
export async function DELETE(req, { params }) {
  await DBConnect();
  try {
    const { id } = params; // Ensure `params` contains `id`
    console.log({ id }); // This should log the correct id
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return NextResponse.json(
        {
          success: false,
          message: "Task not found.",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(
      {
        success: true,
        data: deletedTask,
        message: "Task deleted successfully!",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete task.",
      },
      {
        status: 500,
      }
    );
  }
}
