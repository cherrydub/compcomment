type ErrorProp = { message: string };

export default function ErrorMesage({ message }: ErrorProp) {
  return <div>{message}</div>;
}
