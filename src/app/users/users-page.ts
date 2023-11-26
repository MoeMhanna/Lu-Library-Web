import { Component, OnDestroy, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Store } from '@ngrx/store';
import { selectUsersLoaded } from './+state/users.selectors';
import { UserBo } from './bo/user.bo';
import { HttpStatusEnum } from '../shared/enums/http-status.enum';
import { USERS_KEY } from './+state/users.reducers';
import { Subscription } from 'rxjs';
import { UsersAction } from './+state/users.actions';
import { PopoverBoxInterface } from '../popover-box/interface/popover-box.interface';
import { PopoverBoxService } from '../popover-box/service/popover-box.service';
import { ActionButtonInterface } from '../shared/components/action-button/interface/action-button.interface';
import { MatDialog } from '@angular/material/dialog';
import { UserCreationModal } from './user-creation-modal/user-creation.modal';
import { TokenService } from '../service/token.service';

@Component({
  templateUrl: './users-page.html',
  styleUrl: './users-page.scss'
})
export class UsersPage implements OnInit, OnDestroy {
  public usersList: Array<UserBo> = [];
  public subscriptions = new Subscription();
  public createUserAction: ActionButtonInterface;
  public isAdmin = false;
  public userState$ = this.store.select(selectUsersLoaded);
  public fsUserColumns: { title: string, prop: string }[] = [
    {
      title: 'Username',
      prop: 'username'
    },
    {
      title: 'e-mail',
      prop: 'email'
    },
    {
      title: 'Role',
      prop: 'role'
    },
    {
      title: 'created On',
      prop: 'createdOn'
    },
  ];
  protected userActionList: Array<PopoverBoxInterface> = [];

  protected readonly ColumnMode = ColumnMode;

  constructor(public matDialog: MatDialog,
              public popoverBoxService: PopoverBoxService,
              public tokenService: TokenService,
              private store: Store) {
    this.createUserAction = {
      faIcon: ['fas', 'plus-circle'],
      label: 'create user', handler: () => {
        this.userCreationModal();
      }
    };
  }

  public async presentFsUserOptions($event: MouseEvent, fsUserItemBo: UserBo) {
    await this.initFsUserAccountActionList(fsUserItemBo);
    this.popoverBoxService.openPanel($event, this.userActionList, fsUserItemBo);
    $event.preventDefault();
    $event.stopPropagation();
    return this.popoverBoxService.openPanel($event, this.userActionList, fsUserItemBo);
  }

  public async initFsUserAccountActionList(fsUserItemBo: UserBo) {
    this.userActionList = [
      {
        faIcon: ['fas', 'trash'],
        visible: true,
        label: 'delete',
        handler: async (fsUserItemBo: UserBo) => {
          this.store.dispatch(UsersAction.deleteUser({id: fsUserItemBo.id}));
        }
      },
    ];
  }

  ngOnInit(): void {
    this.userStateSubscription();
    this.store.dispatch(UsersAction.loadUsers());
    this.isAdmin = this.tokenService.isAdmin;
  }

  public userStateSubscription() {
    const userStateSubscription$ = this.userState$
      .subscribe({
        next: (userState) => {
          if (userState.status === HttpStatusEnum.success
            || userState.status === HttpStatusEnum.removeSuccess) {
            this.usersList = userState[USERS_KEY];
          }
        }
      });
    this.subscriptions.add(userStateSubscription$);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private userCreationModal() {
    this.matDialog.open(UserCreationModal)
  }
}
