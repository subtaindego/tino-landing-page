"use client";

// Synchronously guard against browser extensions (ColorZilla, Grammarly, Google Translate, etc.)
// and DOM reconciliation mismatches before React begins hydration or renders
if (typeof window !== 'undefined') {
  // 1. Intercept removeChild / insertBefore errors in capture phase so Next.js error overlay never shows
  window.addEventListener(
    'error',
    function (e) {
      if (
        e &&
        e.message &&
        (e.message.indexOf("reading 'removeChild'") > -1 ||
          e.message.indexOf("reading 'insertBefore'") > -1 ||
          e.message.indexOf("removeChild") > -1)
      ) {
        e.stopImmediatePropagation();
        e.preventDefault();
        return true;
      }
    },
    true
  );

  // 1b. Intercept console.error for browser extension attribute injection (fdprocessedid, etc.)
  const origConsoleError = console.error;
  console.error = function (...args) {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('fdprocessedid') ||
        args[0].includes('did not match') ||
        args[0].includes("didn't match the client properties") ||
        args[0].includes('hydration-mismatch'))
    ) {
      return;
    }
    origConsoleError.apply(console, args);
  };

  // 2. Patch Node.prototype.removeChild defensively
  if (typeof Node !== 'undefined' && Node.prototype) {
    const originalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function (child) {
      if (!child || child.parentNode !== this) {
        return child;
      }
      try {
        return originalRemoveChild.apply(this, arguments);
      } catch (err) {
        return child;
      }
    };

    const originalInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function (newNode, referenceNode) {
      if (referenceNode && referenceNode.parentNode !== this) {
        return newNode;
      }
      try {
        return originalInsertBefore.apply(this, arguments);
      } catch (err) {
        return newNode;
      }
    };
  }
}

export default function SafeHydrationGuard() {
  return null;
}
