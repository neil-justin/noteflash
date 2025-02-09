import { titleCase } from 'title-case';

const pathnameToTitleCase = (pathname: string) => {
  // Remove trailing "/" from pathname, replace "-" with whitespace then finally
  // convert to Title Case
  return titleCase(pathname.replace('/', '').replace('-', ' '));
};

export { pathnameToTitleCase };
