import * as React from 'react';
import { cn } from '@/lib/utils';
import PaginationComponent, { PaginationProp } from './pagination';
import DiaLogComponent from './dialog';
import { Pen, Trash } from 'lucide-react';
const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} />
    </div>
  ),
);
Table.displayName = 'Table';

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />,
);
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
  ),
);
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)} {...props} />
  ),
);
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn('border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', className)}
      {...props}
    />
  ),
);
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  ),
);
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn('p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]', className)}
      {...props}
    />
  ),
);
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn('mt-4 text-sm text-muted-foreground', className)} {...props} />
  ),
);
TableCaption.displayName = 'TableCaption';

// -------------- table component

type TableColumn<R extends Record<string, string | number>> = {
  key: Extract<keyof R, string>;
  title: string;
};

type ITabelProps<R extends Record<string, string | number>> = {
  caption: string;
  cols: TableColumn<R>[];
  rows: R[];
  pagination?: PaginationProp;
  update?: boolean;
  delete?: boolean;
  hanleClickUpdate?: (id: string) => void;
  handleClickDelete?: (id: string) => void;
};

const TableComponent = <R extends Record<string, string | number>>({
  caption,
  rows,
  cols,
  pagination,
  ...props
}: ITabelProps<R>) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [currentId, setCurrentid] = React.useState<string>('');

  const handleUpdate = (id: string) => {
    if (props.update && props.hanleClickUpdate) {
      props.hanleClickUpdate(id);
    }
  };

  const handleDelete = () => {
    if (props.delete && props.handleClickDelete) props.handleClickDelete(currentId);
  };

  const onOpenChange = (stateDialog: boolean) => {
    setOpen(stateDialog);
  };

  return (
    <div>
      <div className="w-full text-right">
        <DiaLogComponent
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={handleDelete}
          onOpenChange={onOpenChange}
        />
      </div>
      <Table>
        <TableCaption>{caption}</TableCaption>
        <TableHeader>
          <TableRow>
            {cols.map((colHead, ind) => (
              <TableHead key={ind} className={ind == 0 ? 'w-[100px]' : ind == cols.length - 1 ? 'text-right' : ''}>
                {colHead.title}
              </TableHead>
            ))}

            {props.update && <TableHead className="w-[100px] text-center">Update</TableHead>}
            {props.delete && <TableHead className="w-[100px] text-center">Delete</TableHead>}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row, ind) => {
            return (
              <TableRow key={ind}>
                {cols.map((col, col_ind) => (
                  <TableCell
                    key={ind + '_' + col.key}
                    className={col_ind == 0 ? 'font-medium' : col_ind == cols.length - 1 ? 'text-right' : ''}
                  >
                    {row[col.key]}
                  </TableCell>
                ))}
                {props.update && (
                  <TableCell key={ind + '_' + row['id']} className="w-[100px]">
                    <Pen
                      className="cursor-pointer m-auto"
                      onClick={() => {
                        handleUpdate('' + row['id']);
                      }}
                    />
                  </TableCell>
                )}
                {props.delete && (
                  <TableCell key={ind + '__' + row['id']} className="w-[100px]">
                    <Trash
                      className="cursor-pointer m-auto"
                      onClick={() => {
                        setOpen(true);
                        setCurrentid('' + row['id']);
                      }}
                    />
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="mb-4"></div>
      {pagination?.totalPage && (
        <PaginationComponent
          current={pagination.current}
          totalPage={pagination.totalPage}
          onChangePage={pagination.onChangePage}
        />
      )}
    </div>
  );
};

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };

export default TableComponent;
