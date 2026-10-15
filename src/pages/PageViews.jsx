import ExplorePage from './ExplorePage';
import SavedSchemesPage from './SavedSchemesPage';
import ApplicationsPage from './ApplicationsPage';
import DeadlinesPage from './DeadlinesPage';
import EligibilityPage from './EligibilityPage';
import AssistantPage from './AssistantPage';
import NotificationsPage from './NotificationsPage';
import ProfileSettingsPage from './ProfileSettingsPage';
import ProfilePage from './ProfilePage';
import AboutPage from './AboutPage';
import NotFoundPage from './NotFoundPage';

export default function PageViews({ page, go, query, setQuery, category, setCategory }) {
  switch (page) {
    case 'Explore Schemes':
      return (
        <ExplorePage
          isRecommended={false}
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
        />
      );

    case 'Recommended':
      return (
        <ExplorePage
          isRecommended={true}
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
        />
      );

    case 'Saved Schemes':
      return <SavedSchemesPage go={go} />;

    case 'My Applications':
      return <ApplicationsPage go={go} />;

    case 'Deadlines':
      return <DeadlinesPage go={go} />;

    case 'Eligibility Guide':
      return <EligibilityPage />;

    case 'AI Assistant':
      return <AssistantPage />;

    case 'Notifications':
      return <NotificationsPage />;

    case 'Profile':
      return <ProfilePage go={go} />;

    case 'Settings':
      return <ProfileSettingsPage title="Settings" go={go} />;

    case 'About Us':
      return <AboutPage />;

    case 'Not Found':
      return <NotFoundPage go={go} />;

    default:
      return null;
  }
}
