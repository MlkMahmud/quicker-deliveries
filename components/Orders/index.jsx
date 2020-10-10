import React, { useEffect, useState } from 'react';
import { Card, Pagination, ResourceList, TextStyle } from '@shopify/polaris';
import cookie from 'js-cookie';
import EmptyState from './EmptyState';
import { useStore } from '../../store';

const MAX_ORDERS_PER_PAGE = 25;

const renderItem = (item) => {
  const { id, name, address, customer, latLng } = item;
  return (
    <ResourceList.Item
      id={id}
      persistActions
      shortcutActions={[
        {
          content: 'View order',
          url: `https://${cookie.get('shopOrigin')}/admin/orders/${id}`,
          external: true,
        },
      ]}
    >
      <b>
        {customer} {name}
      </b>
      <div>{address}</div>
      {!latLng && (
        <TextStyle variation="negative">
          Shipping address is unverified
        </TextStyle>
      )}
    </ResourceList.Item>
  );
};

export default () => {
  const [isLoading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const { dispatch, state } = useStore();
  const { currentPage, initialLoadErrored, nextPageParameters, orders } = state;
  const stopIndex = currentPage * MAX_ORDERS_PER_PAGE;
  const startIndex = currentPage ? stopIndex - MAX_ORDERS_PER_PAGE : 0;
  const items = orders.slice(startIndex, stopIndex);
  const nextPageIsLoaded = stopIndex < orders.length;
  const hasNext = nextPageParameters !== undefined || nextPageIsLoaded;
  const hasPrevious = currentPage > 1;

  async function getPage(dir = 'next') {
    try {
      setLoading(true);
      if (dir === 'previous') {
        dispatch({
          type: 'UPDATE_CURRENT_PAGE',
          payload: -1,
        });
      } else if (nextPageIsLoaded) {
        dispatch({
          type: 'UPDATE_CURRENT_PAGE',
          payload: 1,
        });
      } else {
        const response = await fetch(`/orders?cursor=${nextPageParameters}`);
        if (response.ok) {
          const data = await response.json();
          dispatch({
            type: 'UPDATE_ORDERS',
            payload: { ...data },
          });
        } else throw new Error(response.statusText);
      }
    } catch (e) {
      if (!currentPage) {
        dispatch({
          type: 'INITIAL_LOAD_ERRORED',
        });
      } else {
        dispatch({
          type: 'ERROR',
          payload: {
            message: 'Failed to fetch orders',
            error: true,
          },
        });
      }
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getPage();
  }, []);

  const setWaypoints = () => {
    try {
      const selectedOrders = orders.filter(({ id, latLng }) => {
        if (selected.includes(id)) {
          if (latLng) return true;
          throw Error('Cannot generate route for unverified addresses.');
        }
        return false;
      });
      dispatch({
        type: 'UPDATE_WAYPOINTS',
        payload: selectedOrders,
      });
    } catch (e) {
      dispatch({
        type: 'ERROR',
        payload: {
          message: e.message,
          error: true,
        },
      });
    }
  };

  return (
    <>
      <Card>
        <ResourceList
          emptyState={(
            <EmptyState
              error={initialLoadErrored}
              handleClick={getPage}
            />
          )}
          items={[]}
          loading={isLoading}
          onSelectionChange={setSelected}
          promotedBulkActions={[
            {
              content: 'Generate Route',
              onAction: setWaypoints,
            },
          ]}
          renderItem={renderItem}
          resourceName={{
            singular: 'Order',
            plural: 'Orders',
          }}
          selectedItems={selected}
          totalItemsCount={orders.length}
        />
        {orders.length ? (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <Pagination
              onNext={getPage}
              onPrevious={() => getPage('previous')}
              hasNext={!isLoading && hasNext}
              hasPrevious={!isLoading && hasPrevious}
            />
          </div>
        ) : null}
      </Card>
    </>
  );
};
