import React from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  Heading,
  Stack,
} from '@shopify/polaris';
import { useStore } from '../../store';
import TopUp from './TopUp';

export default () => {
  const { state, dispatch } = useStore();
  const { balance, isTopUpModalOpen } = state;
  return (
    <>
      <Card>
        <Card.Section title={(
          <Heading>
            Available balance: $
            {balance}
          </Heading>
)}
        >
          <Stack vertical spacing="loose">
            <p>
              Your available balance determines the number of orders you can
              process. For every delivery route generated, each unique address
              costs $0.02
            </p>
            <p>
              <b>Note: The maximum number of orders per delivery route is 18</b>
            </p>
            <Stack>
              <ButtonGroup>
                <Button onClick={() => dispatch({ type: 'OPEN_TOPUP' })} primary>
                  Top-up balance
                </Button>
                <a href="/">Learn more</a>
              </ButtonGroup>
            </Stack>
          </Stack>
        </Card.Section>
      </Card>
      {isTopUpModalOpen && <TopUp />}
    </>
  );
};
