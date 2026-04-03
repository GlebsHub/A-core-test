import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { ClientError } from "graphql-request";
import { useForm } from "react-hook-form";
import { useAuth } from "../../auth/useAuth";
import { createGraphQLClient } from "../../graphql/client";
import { LOGIN_MUTATION } from "../../graphql/operations";
import type { LoginFormValues } from "./types";

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useLoginPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setToken, setUser } = useAuth();

  const { control, handleSubmit, setError, clearErrors } =
    useForm<LoginFormValues>({
      defaultValues: { email: "", password: "" },
      mode: "onSubmit",
      reValidateMode: "onChange",
    });

  const mutation = useMutation({
    mutationFn: async (vars: LoginFormValues) => {
      const client = createGraphQLClient();
      const email = vars.email.trim();
      return client.request<{
        login: {
          token: string;
          user: { id: string; email: string; name: string | null };
        };
      }>(LOGIN_MUTATION, {
        email,
        password: vars.password,
      });
    },
    onSuccess: (data) => {
      setToken(data.login.token);
      const u = data.login.user;
      setUser({
        name:
          (u?.name ?? "").trim() || u?.email?.split("@")[0] || "Пользователь",
        email: u?.email,
      });
      void queryClient.invalidateQueries({ queryKey: ["graphql-tree"] });
      navigate({ to: "/" });
    },
    onError: (err) => {
      clearErrors(["email", "password"]);
      const message =
        err instanceof ClientError
          ? err.response.errors?.[0]?.message || err.message
          : err instanceof Error
            ? err.message
            : "";
      setError("password", { message: message || "Ошибка входа" });
    },
  });

  const onSubmit = handleSubmit((data: LoginFormValues) => {
    clearErrors(["email", "password"]);
    mutation.mutate(data);
  });

  return {
    control,
    mutation,
    onSubmit,
    clearErrors,
  };
}
