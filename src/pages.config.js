// Page routing: each key becomes a route (/<Key>). mainPage is shown at "/".
import CV from './pages/CV';
import Contact from './pages/Contact';
import Impact from './pages/Impact';
import Leadership from './pages/Leadership';
import Profile from './pages/Profile';
import Projects from './pages/Projects';
import Timeline from './pages/Timeline';
import Tools from './pages/Tools';
import Training from './pages/Training';
import Layout from './Layout.jsx';

export const PAGES = {
  CV,
  Contact,
  Impact,
  Leadership,
  Profile,
  Projects,
  Timeline,
  Tools,
  Training,
};

export const pagesConfig = {
  mainPage: 'Profile',
  Pages: PAGES,
  Layout,
};
