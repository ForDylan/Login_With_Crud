import { Injectable, inject, signal, Injector, runInInjectionContext } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, query, where } from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, Observable, tap, throwError, } from 'rxjs';
import { getDoc } from 'firebase/firestore';
import { Auth, user } from '@angular/fire/auth';
import { AuthStateService } from '../../shared/data-acces/auth-state.service';

export interface Task 
{
  id: string;
  title: string;
  completed: boolean; 
}

export type TaskCreate = Omit<Task, 'id'>;

const PATH = 'tasks';

@Injectable({
  providedIn: 'root'
})

export class TaskService 
{
  private _firestore = inject(Firestore);
  private _authState = inject(AuthStateService);
  private _collection = collection(this._firestore, PATH);
  private _query = query(this._collection,  where('userId', '==', this._authState.currentUser?.uid));

  loading = signal<boolean>(true);

  getTasks = toSignal
  (
    (collectionData(this._query, { idField: 'id' }) as Observable<Task[]>).pipe(
      tap(() => 
      {
        this.loading.set(false);
      }),
      catchError((error) => {
        this.loading.set(false);
        return throwError(() => error);
      })
    ),
    { initialValue: [] }
  );

  constructor() 
  {
    console.log(this._authState.currentUser);
  }


  getTask(id: string) 
  {
    const injector = inject(Injector);
    return runInInjectionContext(injector, () => {
      const docRef = doc(this._firestore, `${PATH}/${id}`);
      return getDoc(docRef);
    });
  }

  create(task: TaskCreate)
  {
    return addDoc(this._collection, {...task, userId: this._authState.currentUser?.uid,
    });
  }

  update(task: TaskCreate, id: string) 
  {
    const docRef = doc(this._firestore, `${PATH}/${id}`);
    return updateDoc(docRef,  {...task, userId: this._authState.currentUser?.uid, 
    });
  }
}
