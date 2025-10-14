import { AddContactForm } from "@/components/chat/add-contact-form";

export default function AddContactPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 sm:p-6 flex-1">
        <AddContactForm />
      </div>
    </div>
  );
}
