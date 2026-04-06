import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import RouteLayout from "../-shared/routeLayout";
import RouteHeader from "../-shared/routerHeader";

export const Route = createFileRoute("/_protected/dashboard/faqs/")({
  component: RouteComponent,
});

const FAQs = [
  {
    title: "Account & Authentication",
    items: [
      {
        question: "How do I reset my password if I forget it?",
        answer:
          "If you forget your password, click the 'Forgot Password' link on the login page. Enter your registered email address, and we will send you a secure link to reset your password. For security reasons, this link will expire after one hour.",
      },
      {
        question: "How do I set up Two-Factor Authentication (2FA)?",
        answer:
          "We highly recommend enabling Two-Factor Authentication for added security. Navigate to your Profile Settings, select 'Security,' and toggle on 2FA. You will be prompted to scan a QR code using an authenticator app (like Google Authenticator or Authy) and enter the generated code to confirm the setup.",
      },
      {
        question: "I lost access to my authenticator app. How do I log in?",
        answer:
          "If you lose access to your authenticator app, you can use your backup codes to log in. If you don't have backup codes, contact our support team to regain access to your account.",
      },
      {
        question: "Can I stay logged in across multiple devices?",
        answer:
          "Yes, you can stay logged in across multiple devices. However, for security reasons, we recommend logging out from devices you no longer use.",
      },
      {
        question: "How do I update my profile information?",
        answer:
          "To update your profile information, navigate to your Profile Settings. From there, you can edit your personal details, change your email address, and update your password. Remember to save your changes before exiting.",
      },
    ],
  },
  {
    title: "Roles & Permissions",
    items: [
      {
        question: "What are the different user roles available in the system?",
        answer:
          "The system offers several user roles, each with specific permissions and access levels. Common roles include Admin, Manager, and User. Admins have full access to all features and settings, Managers have limited administrative capabilities, and Users have access to standard features based on their assigned permissions.",
      },
      {
        question: "Can a user have multiple roles?",
        answer:
          "No, a user can only be assigned one role at a time. However, the permissions associated with that role can be customized to fit the user's needs.",
      },
      {
        question: "I am a Manager. Why can't I see data from other shops?",
        answer:
          "As a Manager, your access is limited to the shop(s) you are assigned to. This is to ensure data privacy and security across different locations. If you need access to additional shops, please contact your Organization Admin.",
      },
      {
        question: "How do Admins assign or change user roles?",
        answer:
          "Admins can assign or change user roles through the User Management section in the dashboard. They can select a user and update their role as needed.",
      },
      {
        question:
          "What should I do if my role doesn't allow an action I need to perform?",
        answer:
          "If you encounter a permission issue, please contact your Organization Admin. They can review your role and permissions to determine if adjustments are necessary to allow you to perform the required actions.",
      },
    ],
  },
  {
    title: "Multi-Shop Management",
    items: [
      {
        question: "How do I switch between shops if I manage more than one?",
        answer:
          "If you are assigned to multiple shops, you can use the Shop Selector dropdown menu located at the top navigation bar to seamlessly switch your dashboard viewbetween your authorized locations.",
      },
      {
        question: "Can Admins generate reports that compare all shops?",
        answer:
          "Yes, Admins have access to global reporting features that allow them to generate comprehensive reports comparing performance metrics across all shops. This includes sales data, inventory levels, and customer insights.",
      },

      {
        question: "How is inventory managed across multiple locations?",
        answer:
          "Inventory is tracked at the shop level. Managers update and monitor stock for their specific location. Admins can view stock levels across the entire organization and facilitate transfer orders between shops if necessary.",
      },
      {
        question: "Are customer databases shared across all shops?",
        answer:
          "Customer data is securely stored in our central database. However, visibility depends on your role. Staff and Managers only see customer interactions relevant to their assigned shop, while Admins can view the complete customer history across the brand.",
      },
      {
        question: "How do I add a new shop to the system?",
        answer:
          ' Only Admins can create new locations. Go to "Settings" > "Locations" and click "Add New Shop". You will need to provide the shop\'s name, address, contact details, and initial operating hours before assigning Managers and Staff to it.',
      },
    ],
  },
  {
    title: "Data, Reporting & Export",
    items: [
      {
        question: "How do I export data for accounting or external analysis?",
        answer:
          'Users with appropriate permissions (Admins and Managers) can navigate to the "Reports" section, select the desired report (e.g., Sales, Inventory, Attendance), choose a date range, and click "Export." Data can be downloaded in CSV or Excel formats.',
      },
      {
        question: "Is there a log of user activities for auditing purposes?",
        answer:
          "Yes, the platform maintains a comprehensive Audit Log. Admins can access this log to review critical actions, such as role changes, inventory adjustments, and data exports, ensuring accountability and security.",
      },
      {
        question: "Can I schedule automated reports to be sent to my email?",
        answer:
          "Currently, reports must be generated and exported manually from the dashboard. We are evaluating automated email reporting for future updates.",
      },
      {
        question: "How long is historical data retained in the system?",
        answer:
          "Historical data, including sales and inventory logs, is retained securely in our cloud storage for the duration of your active subscription, allowing for long-term year-over-year analysis.",
      },
      {
        question:
          "Why does my exported report look different from the dashboard view?",
        answer:
          "The dashboard provides visual summaries and aggregated metrics, while exported CSV/Excel files contain raw, granular data. This allows you to perform custom calculations or import the data into third-party accounting software.",
      },
    ],
  },
  {
    title: "Operationsn & Notifications",
    items: [
      {
        question: "How do I configure system notifications and alerts?",
        answer:
          'You can customize your alerts by going to "Profile Settings" > "Notifications." Here, you can choose to receive in-app or email notifications for specific events, such as low inventory warnings, new staff registrations, or daily sales summaries.',
      },
      {
        question: "Can Managers set low-stock alerts for their specific shop?",
        answer:
          'Yes. Managers can navigate to their shop\'s "Inventory" tab, select an item, and define a "Minimum Threshold." When stock falls below this level, the Manager will automatically receive an alert.',
      },
      {
        question: "Does the web app work on mobile devices?",
        answer:
          "Yes! The WadaFoodTech web app is fully responsive and optimized for mobile browsers, allowing Managers and Staff to perform tasks like inventory checks or schedule viewing directly from their smartphones or tablets.",
      },
      {
        question:
          "Is there an offline mode if the shop loses internet connection?",
        answer:
          "Because the platform relies on real-time cloud databases for role verification and data accuracy, an active internet connection is required to access the web app and save changes.",
      },
      {
        question: "How do I report a bug or technical issue?",
        answer:
          ' If you experience technical difficulties, please use the "Help & Support" button located in the bottom right corner of the screen to submit a ticket. Include as much detail as possible, and our support team will assist you.',
      },
    ],
  },
  {
    title: "General Usage",
    items: [
      {
        question: "Which web browsers are officially supported?",
        answer:
          "For the best experience, we recommend using the latest versions of Google Chrome, Mozilla Firefox, Apple Safari, or Microsoft Edge.",
      },
      {
        question: "How do I access the Help Center or user guides?",
        answer:
          'You can access our comprehensive Knowledge Base, which includes step-by-step guides and video tutorials, by clicking the "Help" icon in the main navigation menu.',
      },
      {
        question: "Can I customize the dashboard layout?",
        answer:
          "The dashboard layout is standardized to ensure a consistent experience across the organization. However, you can use the filtering and sorting tools within individual tables to customize how data is displayed.",
      },
      {
        question: "How are software updates handled?",
        answer:
          "Because WadaFoodTech is a cloud-based platform, updates and new features are rolled out automatically. You do not need to download or install anything — simply refresh your browser to access the latest version.",
      },
    ],
  },
];

function RouteComponent() {
  return (
    <>
      <RouteLayout>
        <RouteHeader title="FAQs" />
        {FAQs.map((category, index) => (
          <Card className="w-1/2 mx-auto max-w-xl min-w-md" key={index}>
            <CardTitle className="text-xl font-bold text-center">
              {category.title}
            </CardTitle>
            <CardContent>
              <Accordion
                type="single"
                collapsible
                className="w-full rounded-lg "
              >
                {category.items.map((item, idx) => (
                  <AccordionItem
                    key={idx}
                    value={idx.toString()}
                    className="border-b px-4 last:border-b-0"
                  >
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </RouteLayout>
    </>
  );
}
