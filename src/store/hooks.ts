import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// useAppDispatch для dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

// useAppSelector для selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;