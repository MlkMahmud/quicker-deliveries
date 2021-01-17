import React from 'react';
import { EmptyState, Page } from '@shopify/polaris';

export default ({ isInstallationError = false }) => (
  <Page>
    <EmptyState
      action={isInstallationError
        ? null
        : { content: 'Refresh page', onAction: () => window.location.reload() }}
      footerContent={(
        <p>
          Illustration by
          {' '}
          <a
            href="https://icons8.com/illustrations/author/5d99891e7dca3d0016cd4e34"
          >
            Julia
          </a>
          {' '}
          from
          {' '}
          <a href="https://icons8.com/">Icons8</a>
        </p>
      )}
      heading="Uh Oh!!!"
      image="/crash.png"
    >
      {isInstallationError
        ? (
          <p>
            We seem to have run into some unexpected issues.
            Please try uninstalling and reinstalling the app.
          </p>
        )
        : (<p>We seem to have run into some unexpected issues. Please try refreshing the page.</p>)}
    </EmptyState>
  </Page>
);
