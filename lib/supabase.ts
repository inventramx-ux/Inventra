// Local-first Supabase emulator using browser's LocalStorage for functional persistence
import { createClient } from '@supabase/supabase-js'

class LocalSupabaseBuilder {
  private tableName: string;
  private filters: Array<(item: any) => boolean> = [];
  private orderField: string = '';
  private orderAscending: boolean = true;
  private insertData: any = null;
  private updateData: any = null;
  private isDelete: boolean = false;
  private isSingle: boolean = false;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  private getItems(): any[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(`inventra_db_${this.tableName}`);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveItems(items: any[]) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(`inventra_db_${this.tableName}`, JSON.stringify(items));
    } catch (e) {
      console.error('Local persistence save failed:', e);
    }
  }

  select(fields?: string, options?: any) {
    return this;
  }

  eq(field: string, value: any) {
    this.filters.push((item) => item[field] === value);
    return this;
  }

  gte(field: string, value: any) {
    this.filters.push((item) => new Date(item[field]) >= new Date(value));
    return this;
  }

  order(field: string, options?: { ascending?: boolean }) {
    this.orderField = field;
    this.orderAscending = options?.ascending !== false;
    return this;
  }

  limit(count: number) {
    return this;
  }

  insert(data: any) {
    this.insertData = data;
    return this;
  }

  update(data: any) {
    this.updateData = data;
    return this;
  }

  delete() {
    this.isDelete = true;
    return this;
  }

  single() {
    this.isSingle = true;
    return this;
  }

  // Enable thenable behavior for async/await support
  async then(resolve: any, reject: any) {
    try {
      const result = await this.execute();
      return resolve(result);
    } catch (err) {
      return reject ? reject(err) : Promise.reject(err);
    }
  }

  private async execute() {
    let items = this.getItems();

    // 1. Handle Delete
    if (this.isDelete) {
      const remaining = items.filter(item => {
        return !this.filters.every(filter => filter(item));
      });
      this.saveItems(remaining);
      return { data: null, error: null };
    }

    // 2. Handle Insert
    if (this.insertData) {
      const rows = Array.isArray(this.insertData) ? this.insertData : [this.insertData];
      const insertedRows = rows.map(r => {
        const row = { ...r };
        if (!row.id) {
          row.id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'id_' + Math.random().toString(36).substring(2, 9);
        }
        if (!row.created_at) {
          row.created_at = new Date().toISOString();
        }
        return row;
      });

      const newItems = [...insertedRows, ...items];
      this.saveItems(newItems);

      return {
        data: this.isSingle ? insertedRows[0] : insertedRows,
        error: null,
        count: insertedRows.length
      };
    }

    // 3. Handle Update
    if (this.updateData) {
      let updatedRows: any[] = [];
      const updatedItems = items.map(item => {
        const matches = this.filters.every(filter => filter(item));
        if (matches) {
          const updated = { ...item, ...this.updateData };
          if (this.updateData.product_data && item.product_data) {
            updated.product_data = { ...item.product_data, ...this.updateData.product_data };
          }
          if (this.updateData.optimized_content && item.optimized_content) {
            updated.optimized_content = { ...item.optimized_content, ...this.updateData.optimized_content };
          }
          updatedRows.push(updated);
          return updated;
        }
        return item;
      });

      this.saveItems(updatedItems);
      return {
        data: this.isSingle ? updatedRows[0] : updatedRows,
        error: null
      };
    }

    // 4. Handle Select Query
    let filtered = items.filter(item => this.filters.every(filter => filter(item)));

    if (this.orderField) {
      filtered.sort((a, b) => {
        const valA = a[this.orderField];
        const valB = b[this.orderField];
        if (typeof valA === 'string') {
          return this.orderAscending ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return this.orderAscending ? valA - valB : valB - valA;
      });
    }

    return {
      data: this.isSingle ? (filtered[0] || null) : filtered,
      count: filtered.length,
      error: null
    };
  }
}

class LocalSupabaseClient {
  from(tableName: string) {
    return new LocalSupabaseBuilder(tableName);
  }

  channel(name: string) {
    return {
      on: () => {
        return {
          subscribe: () => {
            return {
              unsubscribe: () => {}
            };
          }
        };
      },
      subscribe: () => {
        return {
          unsubscribe: () => {}
        };
      }
    };
  }

  removeChannel(channel: any) {}
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Export local functional engine to support offline/local persistence
export const supabase = new LocalSupabaseClient() as any;
