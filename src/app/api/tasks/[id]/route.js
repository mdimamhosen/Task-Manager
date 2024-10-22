import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import DBConnect from "../../../../lib/DBConnect";
import Task from "../../../../models/Taks";

export async function PUT(req, { params }) {
  await DBConnect();
  try {
    const { id } = await params;
    const updates = await req.json();

    console.log({
      id: id,
      updates: updates,
    });
    if (updates.reminder) {
      console.log("Reminder is active");
    }

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

    const updatedTask = await Task.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    console.log(updatedTask);

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
    const { id } = params;

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

{
  /*

  The PUT function updates a task based on the provided task ID and updates received in the request body.
  It validates the ID and ensures that required fields are present before attempting to update the task in the database.
  If the update is successful, it returns the updated task; otherwise, it handles errors gracefully.
  The DELETE function removes a task from the database using the provided task ID.
  It checks if the task exists and returns an appropriate message if successful or if the task is not found,
 handling any errors that may occur during the deletion process.
*/
}
