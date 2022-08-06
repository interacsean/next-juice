import React, { Dispatch, useReducer } from 'react';
import { Box, Button, Text, FormControl, Input, FormLabel } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { set, lensPath, view } from 'ramda';
import { rand } from 'utils/data/rand/rand';
import { StrRecord } from 'types/util/StrRecord';
import targetValueOf from 'web/utils/html/targetValueOf';
import usePartialCallback from 'web/utils/hooks/usePartialCallback';

type CreateEstimatePublicProps = {};

type Actions = {
  type: string,
} & StrRecord<any>;

const newId = () => rand(0, 1000000);

type EstimateRecord = {
  name: string,
  sub: EstimateRecord[],
  effort: StrRecord<number>,
  id: string,
}

type EstimateState = EstimateRecord[];

const reducer = (state: EstimateState, action: Actions) => {
  console.log({ state, action})
  if (action.type === 'add') {
    return set(
      lensPath(action.path || []),
      view(lensPath(action.path || []), state).concat([{ id: newId(), ...action.value }]),
      state,
    ) as EstimateState;
  } else if (action.type === 'edit') {
    return set(
      lensPath(action.path || []),
      action.value,
      state,
    ) as EstimateState;
  }
  return state;
}

const newRecord = { name: '', sub: [], effort: {} };

type SubEstimateProps = {
  estimate: EstimateRecord,
  path: (string | number)[],
  dispatch: Dispatch<any>,
  id: string;
  orderId: number;
}

function EstimateRow(props: SubEstimateProps) {
  const addSub = React.useCallback(
    () => {
      props.dispatch({ type: 'add', path: [...props.path, props.orderId, 'sub'], value: newRecord })
    },
    [props.dispatch],
  );
  const updateValue = React.useCallback(
    (prop: string[], value: string) => {
      props.dispatch({ type: 'edit', path: [...props.path, props.orderId, ...prop], value });
    },
    [props.dispatch],
  );
  const updateName = usePartialCallback(updateValue, [['name']]);
  const updateEffort = React.useCallback(
    (val: string) => updateValue(['effort', 'days'], val),
    [],
  );
  const addRow = React.useCallback(
    () => props.dispatch({ type: 'add', path: [...props.path, props.orderId, 'sub'], value: newRecord }),
    [props.dispatch],
  );

  return (
    <>
      <Box display="flex">
        <Input placeholder="description" value={props.estimate.name} onChange={targetValueOf(updateName)}/>
        <Input placeholder="effort" value={props.estimate.effort.days} onChange={targetValueOf(updateEffort)}/>
        <Box></Box>
        <Box display="flex" justifyContent="flex-end" flex="1">
          <Button onClick={addSub} variant="outline">+</Button>
        </Box>
      </Box>
      <Box pl={3}>
        {props.estimate.sub.map(
          (est, k) => (
            <EstimateRow id={est.id} orderId={k} key={est.id} estimate={est} path={[...props.path,  props.orderId, 'sub']}
                         dispatch={props.dispatch}/>
          ),
        )}
        {!!props.estimate.sub.length && (
          <Button variant="outline" onClick={addRow}>Add row</Button>
        )}
      </Box>
    </>
  )
}

const CreateEstimate: React.FC<CreateEstimatePublicProps> = (
  _props: CreateEstimatePublicProps,
) => {
  const [estimates, dispatch] = useReducer(reducer, []);
  const { register, handleSubmit } = useForm();
  const onSubmit = React.useCallback(
    (data) => {
      console.log(data);
    },
    [],
  );

  const addRow = React.useCallback(
    () => dispatch({ type: 'add', path: [], value: newRecord }),
    [dispatch],
  );

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input name="name" placeholder="Name" {...register('name')} />
        </FormControl>
      </form>
      {estimates.map(
        (est, k) => (
          <EstimateRow id={est.id} orderId={k} key={est.id} estimate={est} path={[]} dispatch={dispatch}/>
        ),
      )}
      <Button variant="outline" onClick={addRow}>+</Button>
    </Box>
  );
};

export default CreateEstimate;
