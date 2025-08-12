import { redirect } from "next/navigation";

export const metadata = {
  title: "Privacy Policy | JinoShare",
  description: "Read the complete privacy policy for JinoShare."
};

export default function PrivacyPage() {
  redirect("/legal#privacy-policy");
}