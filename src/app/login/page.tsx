"use client";
import { Form, Input, Button, Card } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/zodSchemas";
import { AuthService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function LoginPage() {
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      Swal.fire({
        title: "Login Successful! 🎉",
        text: "Welcome back 👋 You have logged in successfully.",
        icon: "success",
        confirmButtonText: "Continue",
        confirmButtonColor: "#1677ff",
      }).then(() => {
        localStorage.setItem("token", data.token);
        reset();
        router.push("/home"); // ✅ Redirect after OK
      });
    },
    onError: (err: any) => {
      Swal.fire({
        title: "Login Failed ❌",
        text: err.response?.data?.error || "Invalid credentials. Please try again.",
        icon: "error",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#d33",
      });
    },
  });

  const onSubmit = (values: any) => mutation.mutate(values);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Card title="Login" className="w-[400px] shadow-lg">
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
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
              render={({ field }) => (
                <Input.Password {...field} placeholder="Password" />
              )}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={mutation.isPending}
            className="w-full"
          >
            Login
          </Button>

          <div className="text-center mt-3">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-blue-600">
              Sign Up
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}
