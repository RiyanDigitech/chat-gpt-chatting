"use client";
import { Form, Input, Button, Card, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/lib/zodSchemas";
import { AuthService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function SignupPage() {
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(signupSchema),
  });
const router = useRouter();

 const mutation = useMutation({
  mutationFn: AuthService.signup,
  onSuccess: (data) => {
    Swal.fire({
      title: "Signup Successful!",
      text: data.message || "Account created successfully.",
      icon: "success",
      confirmButtonText: "Go to Login",
    }).then(() => router.push("/login"));
    reset();
  },
  onError: (err: any) => {
    Swal.fire({
      title: "Signup Failed!",
      text: err.response?.data?.error || "Please try again later.",
      icon: "error",
    });
  },
});
  const onSubmit = (values: any) => mutation.mutate(values);

  return (
    <div className="flex items-center justify-center h-screen  w-full">
      <Card title="Create Account" className="w-[36%!important] shadow-lg">
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className=" w-!8/12">
          <Form.Item label="Name">
            <Controller
              name="name"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Your name" />}
            />
          </Form.Item>

          <Form.Item label="Email">
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Email" />}
            />
          </Form.Item>

          <Form.Item label="Password">
            <Controller
              name="password"
              control={control}
              render={({ field }) => <Input.Password {...field} placeholder="Password" />}
            />
          </Form.Item>

          <Form.Item label="Phone (optional)">
            <Controller
              name="phone"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Phone" />}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={mutation.isPending}
            className="w-full mb-2"
          >
            Sign Up
          </Button>

          <div className="text-center mt-3">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600">
              Login
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}
