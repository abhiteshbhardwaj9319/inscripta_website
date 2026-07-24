/*!
* Start Bootstrap - Creative v7.0.2 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2026 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // ScrollSpy is disabled — Bootstrap 5.0.x crashes on multi-page navs where
    // some links resolve to in-page anchors and others go to other routes/URLs.
    // The nav is primarily multi-page so scroll-based active highlighting added
    // little value and produced a runtime error on every page load.

    // Mark the nav link matching the current page as active (multi-page
    // replacement for ScrollSpy). Product/case-study sub-pages light up
    // their parent dropdown toggle instead.
    const navRoot = document.body.querySelector('#navbarResponsive');
    if (navRoot) {
        const normalizePath = function (path) {
            var p = path.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
            if (p.length > 1) {
                p = p.replace(/\/+$/, '');
            }
            return p || '/';
        };
        const currentPath = normalizePath(window.location.pathname);
        navRoot.querySelectorAll('a[href]').forEach(function (link) {
            if (link.classList.contains('dropdown-toggle')) {
                return;
            }
            if (link.host !== window.location.host || link.hash) {
                return;
            }
            if (normalizePath(link.pathname) === currentPath) {
                link.classList.add('active');
                const dropdown = link.closest('.dropdown');
                if (dropdown) {
                    const toggle = dropdown.querySelector('.dropdown-toggle');
                    if (toggle) {
                        toggle.classList.add('active');
                    }
                }
            }
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                if (!responsiveNavItem.hasAttribute('data-bs-toggle')) {
                    navbarToggler.click();
                }
            }
        });
    });

    // Correct anchor landing after lazy-loaded media settles.
    // Cross-page links such as /#contact otherwise land on the section above the
    // target, because images above it (e.g. team photos) load late and push the
    // target down after the browser's initial hash jump. We re-align once images
    // have loaded, but stop the moment the user scrolls so we never fight them.
    if (window.location.hash && window.location.hash.length > 1) {
        const hashTarget = document.getElementById(
            decodeURIComponent(window.location.hash.slice(1))
        );
        if (hashTarget) {
            let userScrolled = false;
            const markScrolled = function () { userScrolled = true; };
            window.addEventListener('wheel', markScrolled, { passive: true, once: true });
            window.addEventListener('touchmove', markScrolled, { passive: true, once: true });
            window.addEventListener('keydown', function (e) {
                if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].indexOf(e.key) !== -1) {
                    userScrolled = true;
                }
            }, { once: true });

            const realign = function () {
                if (!userScrolled) {
                    hashTarget.scrollIntoView();
                }
            };

            window.addEventListener('load', function () {
                realign();
                setTimeout(realign, 400);
            });
        }
    }

    // Activate SimpleLightbox plugin for portfolio items
    //new SimpleLightbox({
    //    elements: '#portfolio a.portfolio-box'
    //});

});
