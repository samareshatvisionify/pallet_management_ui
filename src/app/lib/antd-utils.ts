import { notification, message, Modal } from 'antd';
import type { NotificationArgsProps } from 'antd';

// Notification configurations
export const notificationConfig = {
  placement: 'topRight' as const,
  duration: 4.5,
  maxCount: 3,
};

// Message configurations  
export const messageConfig = {
  duration: 3,
  maxCount: 3,
};

// Common notification types
export const showSuccessNotification = (config: NotificationArgsProps) => {
  notification.success({
    ...notificationConfig,
    ...config,
  });
};

export const showErrorNotification = (config: NotificationArgsProps) => {
  notification.error({
    ...notificationConfig,
    ...config,
  });
};

export const showWarningNotification = (config: NotificationArgsProps) => {
  notification.warning({
    ...notificationConfig,
    ...config,
  });
};

export const showInfoNotification = (config: NotificationArgsProps) => {
  notification.info({
    ...notificationConfig,
    ...config,
  });
};

// Common message types
export const showSuccessMessage = (content: string) => {
  message.success(content);
};

export const showErrorMessage = (content: string) => {
  message.error(content);
};

export const showWarningMessage = (content: string) => {
  message.warning(content);
};

export const showInfoMessage = (content: string) => {
  message.info(content);
};

export const showLoadingMessage = (content: string, duration: number = 0) => {
  return message.loading(content, duration);
};

// Common modal configurations
export const showConfirmModal = (config: any) => {
  Modal.confirm({
    title: 'Confirm Action',
    centered: true,
    okType: 'danger',
    ...config,
  });
};

export const showInfoModal = (config: any) => {
  Modal.info({
    title: 'Information',
    centered: true,
    ...config,
  });
};

// Table configurations
export const defaultTableProps = {
  size: 'middle' as const,
  bordered: false,
  showSorterTooltip: false,
  pagination: {
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number, range: [number, number]) =>
      `${range[0]}-${range[1]} of ${total} items`,
    pageSizeOptions: ['10', '20', '50', '100'],
  },
};

// Form configurations
export const defaultFormProps = {
  layout: 'vertical' as const,
  requiredMark: false,
  colon: false,
  validateTrigger: 'onBlur' as const,
};

// Common responsive breakpoints
export const responsiveBreakpoints = {
  xs: { span: 24 },
  sm: { span: 12 },
  md: { span: 8 },
  lg: { span: 6 },
  xl: { span: 4 },
  xxl: { span: 3 },
};

// Color utilities
export const statusColors = {
  success: '#52c41a',
  warning: '#faad14',  
  error: '#f5222d',
  info: '#1890ff',
  processing: '#1890ff',
  default: '#d9d9d9',
} as const;

// Size utilities
export const componentSizes = {
  small: 'small',
  middle: 'middle', 
  large: 'large',
} as const;

export type ComponentSize = keyof typeof componentSizes;
export type StatusColor = keyof typeof statusColors; 