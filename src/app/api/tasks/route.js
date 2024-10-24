import { NextResponse } from "next/server";
import DBConnect from "../../../lib/DBConnect";
import Task from "../../../models/Taks";

export async function POST(req) {
  await DBConnect();
  try {
    const task = await req.json();
    console.log(task);

    const newTask = await Task.create(task);
    return NextResponse.json(
      {
        success: true,
        data: newTask,
        message: "Task created successfully!",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create task.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(req) {
  await DBConnect();
  try {
    const tasks = await Task.find();
    return NextResponse.json(
      {
        success: true,
        data: tasks,
        message: "Tasks fetched successfully!",
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
        message: "Failed to fetch tasks.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req) {
  await DBConnect();
  try {
    const { id } = await req.json();
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
  // The POST function handles the creation of a new task.
  // It retrieves task data from the request body, creates a new task in the database, and returns the created task in a success response.
  // The GET function fetches all tasks from the database and returns them in a success response, or an error message if the fetch fails.
  // The DELETE function deletes a task specified by its ID, obtained from the request body.
  // It checks if the task exists before attempting to delete it and returns appropriate success or error messages based on the operation's outcome.
}
