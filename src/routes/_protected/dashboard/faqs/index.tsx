import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/dashboard/faqs/")({
  component: RouteComponent,
});

const styles = `
 .page-header {
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      color: #f8fafc;
      padding: 56px 24px 48px;
      text-align: center;
    }
    .page-header h1 {
      font-size: 2rem;
      font-weight: 700;
      letter-spacing: -0.5px;
      margin-bottom: 12px;
    }
    .page-header p {
      font-size: 1rem;
      color: #94a3b8;
      max-width: 560px;
      margin: 0 auto;
    }

    /* ── Search bar ── */
    .search-wrap {
      display: flex;
      justify-content: center;
      padding: 32px 24px 8px;
    }
    .search-wrap input {
      width: 100%;
      max-width: 520px;
      padding: 10px 16px;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 0.95rem;
      outline: none;
      background: #fff;
      transition: border-color 0.2s;
    }
    .search-wrap input:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,.15); }

    /* ── Main layout ── */
    .container {
      max-width: 820px;
      margin: 0 auto;
      padding: 24px 24px 64px;
    }

    /* ── Category section ── */
    .category {
      margin-bottom: 36px;
    }
    .category-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #6366f1;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 2px solid #e0e7ff;
    }
    .category-title .icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    /* ── Accordion item ── */
    .faq-item {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      margin-bottom: 8px;
      overflow: hidden;
      transition: box-shadow 0.2s;
    }
    .faq-item:hover { box-shadow: 0 2px 8px rgba(0,0,0,.07); }
    .faq-item.hidden { display: none; }

    .faq-question {
      width: 100%;
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
      padding: 16px 20px;
      text-align: left;
      font-size: 0.95rem;
      font-weight: 600;
      color: #1e293b;
      transition: background 0.15s;
    }
    .faq-question:hover { background: #f8fafc; }
    .faq-question .q-num {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      border-radius: 6px;
      background: #e0e7ff;
      color: #4f46e5;
      font-size: 0.75rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 1px;
    }
    .faq-question .q-text { flex: 1; }
    .faq-question .chevron {
      flex-shrink: 0;
      width: 18px;
      height: 18px;
      color: #9ca3af;
      transition: transform 0.25s;
      margin-top: 3px;
    }
    .faq-item.open .chevron { transform: rotate(180deg); }

    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease, padding 0.3s ease;
      padding: 0 20px 0 56px;
    }
    .faq-item.open .faq-answer {
      max-height: 600px;
      padding: 0 20px 18px 56px;
    }
    .faq-answer p {
      font-size: 0.9rem;
      color: #374151;
      line-height: 1.7;
    }
    .faq-answer ul {
      margin: 8px 0 0 16px;
      font-size: 0.9rem;
      color: #374151;
      line-height: 1.7;
    }
    .faq-answer ul li { margin-bottom: 4px; }
    .faq-answer strong { color: #1e293b; }

    /* ── No results ── */
    #no-results {
      display: none;
      text-align: center;
      padding: 48px 0;
      color: #9ca3af;
      font-size: 0.95rem;
    }

    /* ── Footer ── */
    .page-footer {
      text-align: center;
      padding: 32px 24px;
      border-top: 1px solid #e5e7eb;
      font-size: 0.85rem;
      color: #9ca3af;
    }
    .page-footer a { color: #6366f1; text-decoration: none; }
    .page-footer a:hover { text-decoration: underline; }
`;
function RouteComponent() {
  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/*  Header */}
      <header className="page-header">
        <h1>Frequently Asked Questions</h1>
        <p>
          Find answers to common questions about roles, shop management, account
          settings, and more.
        </p>
      </header>

      {/*  Search */}
      <div className="search-wrap">
        <input
          type="search"
          id="faq-search"
          placeholder="Search questions..."
          autoComplete="off"
        />
      </div>

      {/*  FAQ Content */}
      <main className="container" id="faq-container">
        {/* Category 1: Account & Authentication */}
        <section className="category" data-category="account">
          <div className="category-title">
            <svg
              className="icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Account &amp; Authentication
          </div>

          <div className="faq-item">
            <button className="faq-question" aria-expanded="false">
              <span className="q-num">1</span>
              <span className="q-text">
                How do I reset my password if I forget it?
              </span>
              <svg
                className="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>
                If you forget your password, click the{" "}
                <strong>"Forgot Password"</strong> link on the login page. Enter
                your registered email address, and we will send you a secure
                link to reset your password. For security reasons, this link
                will expire after one hour.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question" aria-expanded="false">
              <span className="q-num">2</span>
              <span className="q-text">
                How do I set up Two-Factor Authentication (2FA)?
              </span>
              <svg
                className="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>
                We highly recommend enabling Two-Factor Authentication for added
                security. Navigate to your <strong>Profile Settings</strong>,
                select <strong>"Security,"</strong> and toggle on 2FA. You will
                be prompted to scan a QR code using an authenticator app (like
                Google Authenticator or Authy) and enter the generated code to
                confirm the setup.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question" aria-expanded="false">
              <span className="q-num">3</span>
              <span className="q-text">
                I lost access to my authenticator app. How do I log in?
              </span>
              <svg
                className="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>
                If you cannot access your authenticator app, please contact your
                Organization Admin. They have the ability to reset your 2FA
                settings, allowing you to set it up again on a new device.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question" aria-expanded="false">
              <span className="q-num">4</span>
              <span className="q-text">
                Can I stay logged in across multiple devices?
              </span>
              <svg
                className="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>
                Yes, you can log in from multiple devices. However, for security
                purposes, our session management system will automatically log
                you out after a period of inactivity. You can also manually
                review and revoke active sessions from your{" "}
                <strong>Profile Settings</strong>.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question" aria-expanded="false">
              <span className="q-num">5</span>
              <span className="q-text">
                How do I update my profile information?
              </span>
              <svg
                className="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>
                To update your name, contact email, or phone number, click on
                your avatar in the top right corner and select{" "}
                <strong>"Profile Settings."</strong> Make your changes and click{" "}
                <strong>"Save."</strong> Note that changing your email address
                may require email verification.
              </p>
            </div>
          </div>
        </section>

        {/* Category 2: Roles & Permissions */}
        <section className="category" data-category="roles">
          <div className="category-title">
            <svg
              className="icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Roles &amp; Permissions
          </div>

          <div className="faq-item">
            <button className="faq-question" aria-expanded="false">
              <span className="q-num">6</span>
              <span className="q-text">
                What are the different user roles available in the system?
              </span>
              <svg
                className="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>
                The platform utilizes Role-Based Access Control (RBAC) with
                three primary roles:
              </p>
              <ul>
                <li>
                  <strong>Admin:</strong> Has full access to all shops, system
                  settings, user management, and global reporting.
                </li>
                <li>
                  <strong>Manager:</strong> Has administrative access limited to
                  their specifically assigned shop(s), including staff
                  scheduling, local inventory, and shop-specific reports.
                </li>
                <li>
                  <strong>Staff:</strong> Has restricted access to perform
                  day-to-day operations (like viewing orders or updating basic
                  inventory) only within their assigned shop.
                </li>
              </ul>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question" aria-expanded="false">
              <span className="q-num">7</span>
              <span className="q-text">Can a user have multiple roles?</span>
              <svg
                className="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>
                No, a user is assigned a single role that defines their base
                permissions. However, an Admin can assign a Manager or Staff
                member to multiple specific shops if necessary.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question" aria-expanded="false">
              <span className="q-num">8</span>
              <span className="q-text">
                I am a Manager. Why can't I see data from other shops?
              </span>
              <svg
                className="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>
                For data privacy and operational focus, Managers and Staff are
                strictly isolated to the shop(s) they are assigned to. Only
                Organization Admins have the global permissions required to view
                and compare data across all locations.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question" aria-expanded="false">
              <span className="q-num">9</span>
              <span className="q-text">
                How do Admins assign or change user roles?
              </span>
              <svg
                className="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>
                Admins can navigate to <strong>"User Management"</strong> in the
                sidebar. From there, they can invite new users, select their
                role (Admin, Manager, or Staff), and assign them to specific
                shops. Existing roles can be edited by clicking on a user's
                profile and adjusting their permissions.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question" aria-expanded="false">
              <span className="q-num">10</span>
              <span className="q-text">
                What should I do if my role doesn't allow an action I need to
                perform?
              </span>
              <svg
                className="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>
                If you encounter a permission error for a task you believe you
                should be able to perform, please contact your Organization
                Admin to request a review of your role or shop assignments.
              </p>
            </div>
          </div>
        </section>

        {/* Category 3: Multi-Shop Management */}
        <section className="category" data-category="shops">
          <div className="category-title">
            <svg
              className="icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Multi-Shop Management
          </div>

          <div className="faq-item">
            <button className="faq-question" aria-expanded="false">
              <span className="q-num">11</span>
              <span className="q-text">
                How do I switch between shops if I manage more than one?
              </span>
              <svg
                className="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>
                If you are assigned to multiple shops, you can use the{" "}
                <strong>"Shop Selector"</strong> dropdown menu located at the
                top navigation bar to seamlessly switch your dashboard view
                between your authorized locations.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question" aria-expanded="false">
              <span className="q-num">12</span>
              <span className="q-text">
                Can Admins generate reports that compare all shops?
              </span>
              <svg
                className="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>
                Yes. Admins have access to the{" "}
                <strong>"Global Analytics"</strong> dashboard, which aggregates
                data from all locations. You can filter by specific regions,
                compare shop performance, and export consolidated reports.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question" aria-expanded="false">
              <span className="q-num">13</span>
              <span className="q-text">
                How is inventory managed across multiple locations?
              </span>
              <svg
                className="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>
                Inventory is tracked at the shop level. Managers update and
                monitor stock for their specific location. Admins can view stock
                levels across the entire organization and facilitate transfer
                orders between shops if necessary.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question" aria-expanded="false">
              <span className="q-num">14</span>
              <span className="q-text">
                Are customer databases shared across all shops?
              </span>
              <svg
                className="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>
                Customer data is securely stored in our central database.
                However, visibility depends on your role. Staff and Managers
                only see customer interactions relevant to their assigned shop,
                while Admins can view the complete customer history across the
                brand.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question" aria-expanded="false">
              <span className="q-num">15</span>
              <span className="q-text">
                How do I add a new shop to the system?
              </span>
              <svg
                className="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>
                Only Admins can create new locations. Go to{" "}
                <strong>"Settings" &gt; "Locations"</strong> and click{" "}
                <strong>"Add New Shop."</strong> You will need to provide the
                shop's name, address, contact details, and initial operating
                hours before assigning Managers and Staff to it.
              </p>
            </div>
          </div>
        </section>

        {/* Category 4: Data, Reporting & Export */}
        <section className="category" data-category="reporting">
          <div className="category-title">
            <svg
              className="icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
            Data, Reporting &amp; Export
          </div>

          <div className="faq-item">
            <button className="faq-question" aria-expanded="false">
              <span className="q-num">16</span>
              <span className="q-text">
                How do I export data for accounting or external analysis?
              </span>
              <svg
                className="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>
                Users with appropriate permissions (Admins and Managers) can
                navigate to the <strong>"Reports"</strong> section, select the
                desired report (e.g., Sales, Inventory, Attendance), choose a
                date range, and click <strong>"Export."</strong> Data can be
                downloaded in CSV or Excel formats.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question" aria-expanded="false">
              <span className="q-num">17</span>
              <span className="q-text">
                Is there a log of user activities for auditing purposes?
              </span>
              <svg
                className="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>
                Yes, the platform maintains a comprehensive{" "}
                <strong>Audit Log.</strong> Admins can access this log to review
                critical actions, such as role changes, inventory adjustments,
                and data exports, ensuring accountability and security.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question" aria-expanded="false">
              <span className="q-num">18</span>
              <span className="q-text">
                Can I schedule automated reports to be sent to my email?
              </span>
              <svg
                className="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>
                Currently, reports must be generated and exported manually from
                the dashboard. We are evaluating automated email reporting for
                future updates.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question" aria-expanded="false">
              <span className="q-num">19</span>
              <span className="q-text">
                How long is historical data retained in the system?
              </span>
              <svg
                className="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>
                Historical data, including sales and inventory logs, is retained
                securely in our cloud storage for the duration of your active
                subscription, allowing for long-term year-over-year analysis.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question" aria-expanded="false">
              <span className="q-num">20</span>
              <span className="q-text">
                Why does my exported report look different from the dashboard
                view?
              </span>
              <svg
                className="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>
                The dashboard provides visual summaries and aggregated metrics,
                while exported CSV/Excel files contain raw, granular data. This
                allows you to perform custom calculations or import the data
                into third-party accounting software.
              </p>
            </div>
          </div>
        </section>

        {/* Category 5: Operations & Notifications */}
        <section className="category" data-category="operations">
          <div className="category-title">
            <svg
              className="icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            Operations &amp; Notifications
          </div>

          <div className="faq-item">
            <button className="faq-question" aria-expanded="false">
              <span className="q-num">21</span>
              <span className="q-text">
                How do I configure system notifications and alerts?
              </span>
              <svg
                className="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>
                You can customize your alerts by going to{" "}
                <strong>"Profile Settings" &gt; "Notifications."</strong> Here,
                you can choose to receive in-app or email notifications for
                specific events, such as low inventory warnings, new staff
                registrations, or daily sales summaries.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question" aria-expanded="false">
              <span className="q-num">22</span>
              <span className="q-text">
                Can Managers set low-stock alerts for their specific shop?
              </span>
              <svg
                className="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>
                Yes. Managers can navigate to their shop's{" "}
                <strong>"Inventory"</strong> tab, select an item, and define a{" "}
                <strong>"Minimum Threshold."</strong> When stock falls below
                this level, the Manager will automatically receive an alert.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question" aria-expanded="false">
              <span className="q-num">23</span>
              <span className="q-text">
                Does the web app work on mobile devices?
              </span>
              <svg
                className="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>
                Yes! The WadaFoodTech web app is fully responsive and optimized
                for mobile browsers, allowing Managers and Staff to perform
                tasks like inventory checks or schedule viewing directly from
                their smartphones or tablets.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question" aria-expanded="false">
              <span className="q-num">24</span>
              <span className="q-text">
                Is there an offline mode if the shop loses internet connection?
              </span>
              <svg
                className="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>
                Because the platform relies on real-time cloud databases for
                role verification and data accuracy, an active internet
                connection is required to access the web app and save changes.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question" aria-expanded="false">
              <span className="q-num">25</span>
              <span className="q-text">
                How do I report a bug or technical issue?
              </span>
              <svg
                className="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>
                If you experience technical difficulties, please use the{" "}
                <strong>"Help &amp; Support"</strong> button located in the
                bottom right corner of the screen to submit a ticket. Include as
                much detail as possible, and our support team will assist you.
              </p>
            </div>
          </div>
        </section>

        {/* Category 6: General Usage */}
        <section className="category" data-category="general">
          <div className="category-title">
            <svg
              className="icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            General Usage
          </div>

          <div className="faq-item">
            <button className="faq-question" aria-expanded="false">
              <span className="q-num">26</span>
              <span className="q-text">
                Which web browsers are officially supported?
              </span>
              <svg
                className="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>
                For the best experience, we recommend using the latest versions
                of{" "}
                <strong>Google Chrome, Mozilla Firefox, Apple Safari,</strong>{" "}
                or <strong>Microsoft Edge.</strong>
              </p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question" aria-expanded="false">
              <span className="q-num">27</span>
              <span className="q-text">
                How do I access the Help Center or user guides?
              </span>
              <svg
                className="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>
                You can access our comprehensive Knowledge Base, which includes
                step-by-step guides and video tutorials, by clicking the{" "}
                <strong>"Help"</strong> icon in the main navigation menu.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question" aria-expanded="false">
              <span className="q-num">28</span>
              <span className="q-text">
                Can I customize the dashboard layout?
              </span>
              <svg
                className="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>
                The dashboard layout is standardized to ensure a consistent
                experience across the organization. However, you can use the
                filtering and sorting tools within individual tables to
                customize how data is displayed.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question" aria-expanded="false">
              <span className="q-num">29</span>
              <span className="q-text">How are software updates handled?</span>
              <svg
                className="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>
                Because WadaFoodTech is a cloud-based platform, updates and new
                features are rolled out automatically. You do not need to
                download or install anything — simply refresh your browser to
                access the latest version.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question" aria-expanded="false">
              <span className="q-num">30</span>
              <span className="q-text">
                Who do I contact for billing or subscription inquiries?
              </span>
              <svg
                className="chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-answer">
              <p>
                Billing and subscription management are handled exclusively by
                Organization Admins. If you are an Admin, you can access
                invoices and plan details under{" "}
                <strong>"Settings" &gt; "Billing."</strong>
              </p>
            </div>
          </div>
        </section>

        <div id="no-results">
          No questions matched your search. Try different keywords.
        </div>
      </main>

      {/* Footer */}
      <footer className="page-footer">
        Still have questions? <a href="#">Contact Support</a> &mdash; we're
        happy to help.
      </footer>
    </div>
  );
}
