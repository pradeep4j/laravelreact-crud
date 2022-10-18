<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $students = Student::all();
        return response()->json(['status'=>200,'studentrecord'=> $students]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
            $validator = Validator::make($request->all(),[
                'name' => 'required|max:100',
                'course' => 'required|max:100',
                'email' => 'required|email|max:100',
                'phone' => 'required|min:10|max:10',

            ]);
            if(!$validator->fails()){
                $student = new Student();
                $student->name = $request->input('name');
                $student->course = $request->input('course');
                $student->email = $request->input('email');
                $student->phone = $request->input('phone');
                $student->save();

                return response()->json(['status' => 200, 'message' => 'Data inserted successfully!']);
            }
            else{
                return response()->json(['status' => 400, 'message' => $validator->messages()]);
            }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function show(Student $student)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $studentWithId = Student::find($id);
        if($studentWithId)
        return response()->json(['status' => 200, 'selectedStudenRecord' => $studentWithId]);
        else
        return response()->json(['status' => 404, 'selectedStudenRecord' => 'No Student ID Found!']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {
            $validator = Validator::make($request->all(),[
                'name' => 'required|max:100',
                'course' => 'required|max:100',
                'email' => 'required|email|max:100',
                'phone' => 'required|min:10|max:10',

            ]);

            if(!$validator->fails())
            {
                $student = Student::find($id);
                $student->name = $request->input('name');
                $student->course = $request->input('course');
                $student->email = $request->input('email');
                $student->phone = $request->input('phone');
                $student->Update();
                return response()->json(['status' => 200, 'message' => 'Student Updated successfully!']);
            }
            else{
                return response()->json(['status' => 400, 'message' => $validator->messages()]);
            }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
            $studentTodelete = Student::findOrFail($id);
            $studentTodelete->delete();
            return response()->json(['status' => 200,'message' => 'Student deleted successfully!']);

        }
        catch(Exception $e){
            return response()->json(['status' => 400,'message'=> $e->message]);
        }
    }
}
