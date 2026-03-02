import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border-light dark:border-border-dark mt-20">
      <div className="container-layout py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <Link
              href="/"
              className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark"
            >
              garden
            </Link>
            <p className="mt-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
              개발하며 배운 것들을 기록합니다.
            </p>
          </div>

          <div className="flex gap-8">
            <div>
              <h4 className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark mb-3">
                Pages
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/posts"
                    className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors"
                  >
                    Posts
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark mb-3">
                Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border-light dark:border-border-dark">
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
            &copy; {new Date().getFullYear()} garden. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
