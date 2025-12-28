import { Form, Input, Checkbox, Button } from "antd";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { loginSchema, type LoginFormValues } from "./schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../../../hooks/queries/Auth";


const LoginForm = () => {
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  });

  const {mutateAsync: loginAsync, isPending: isPendingLogin, isError: isErrorLogin} = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async(values: LoginFormValues) => {
    console.log("Success:", values);
    const {password, username} = values;
    const res = await loginAsync({password, username});
    console.log('response in async: ', res);
  };

  return (
    <Form
      layout="horizontal"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ minWidth: 600 }}
      onFinish={handleSubmit(onSubmit)}
    >
      <FormProvider {...methods}>
        {/* Username */}
        <Form.Item
          label="Username"
          layout="vertical"
          name="username"
          validateStatus={errors.username ? "error" : ""}
          help={errors.username?.message}
        >
          <Controller
            name="username"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        {/* Password */}
        <Form.Item
          label="Password"
          layout="vertical"
          name="password"
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => <Input.Password {...field} />}
          />
        </Form.Item>

        {/* Remember */}
        <Form.Item
        validateStatus={errors.remember ? "error" : ""}
        help={errors.remember?.message}
        >
          <Controller
            name="remember"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              >
                Remember me
              </Checkbox>
            )}
          />
        </Form.Item>

        {/* Submit */}
        <Form.Item layout="vertical" style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit" loading={isPendingLogin} disabled={isPendingLogin}>
            Login
          </Button>
        </Form.Item>
      </FormProvider>
    </Form>
  );
};

export default LoginForm;
